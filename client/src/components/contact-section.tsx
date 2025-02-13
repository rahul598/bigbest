import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store/store";
import { updateField, submitForm } from "../redux/slices/formSlice";
import { FaRoute } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { BsEnvelopeFill } from "react-icons/bs";

const ContactForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.form);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(updateField({ field: e.target.name as keyof RootState["form"], value: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(submitForm());
  };

  return (
    <motion.section
      className="container mx-auto my-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="md:col-span-2">
        <div className="form-bg">  
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <motion.input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="fill-box p-2"
            whileFocus={{ scale: 1.01 }}
          />

          <motion.input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="fill-box p-2"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.div className="flex gap-2 items-center">
            <select className="w-20 fill-box p-2" defaultValue="+44">
              <option>+91</option>
              <option>+1</option>
              <option>+44</option>
            </select>
            <motion.input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="fill-box p-2 w-[90%]"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          <motion.textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="fill-box p-2"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.button
            type="submit"
            className="btn-c transition text-[#fff]"
            whileHover={{ scale: 1.05 }}
          >
           SUBMIT
          </motion.button>
        </form>
        </div>
        </div>
        <div className="md:col-span-1">
          <div className="card c-card p-6 mb-5">
          <h3 className="text-3xl font-semibold">Address</h3>
          <h6 className="my-3 flex"><span className="mr-2"><FaRoute /></span>123 Success Avenue, London, UK</h6>  
          </div>
          <div className="card c-card p-6 mb-5">
          <h3 className="text-3xl font-semibold">Phone</h3>
          <h6 className="my-3 flex"><span className="mr-2"><FaPhone /></span>+44- 1234567890</h6>  
          </div>
          <div className="card c-card p-6 mb-5">
          <h3 className="text-3xl font-semibold">E-mail Address</h3>
          <h6 className="my-3 flex"><span className="mr-2"><BsEnvelopeFill /></span>contact@11plus-success.com</h6>  
          </div>                    
        </div>
      </div>
    </motion.section>
  );
};

export default ContactForm;


