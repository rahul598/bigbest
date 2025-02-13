import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export function PricingSection() {
  const pricingPlans = [
    {
      name: "Basic Plan",
      monthlyPrice: "15.99",
      features: [
        "Lorem ipsum dolor",
        "Lorem ipsum dolor Lorem",
        "Lorem ipsum dolor",
        "Lorem ipsum dolor Lorem",
        "Lorem ipsum dolor Lorem",
      ],
    },
    {
      name: "Premium Plan",
      monthlyPrice: "49.99",
      features: [
        "Lorem ipsum dolor",
        "Lorem ipsum dolor Lorem",
        "Lorem ipsum dolor Lorem",
        "Lorem ipsum dolor Lorem",
        "Lorem ipsum dolor Lorem",
        "Lorem ipsum dolor Lorem",
      ],
      highlight: true, // Highlighted plan
    },
    {
      name: "Gold Plan",
      monthlyPrice: "65.99",
      features: [
        "Lorem ipsum dolor",
        "Lorem ipsum dolor Lorem",
        "Lorem ipsum dolor Lorem",
        "Lorem ipsum dolor Lorem",
        "Lorem ipsum dolor Lorem",
        "Lorem ipsum dolor Lorem",
      ],
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 font-[Rowdies]">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2 text-center">
          <motion.img
            src="https://vinsonedge.com/wp-content/uploads/2025/01/start-Design-1-1.png"
            alt="Floating design"
            className="w-[100px]"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </div>

        <div className="col-span-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold text-[#000]">PRICING</p>
              <h2 className="text-3xl text-[43px] leading-[50px] font-bold mb-4 text-[#000]">
                Flexible Pricing
              </h2>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="text-center mb-12">
        <Tabs defaultValue="monthly" className="w-full mx-auto">
          <TabsList className="bg-transparent flex items-center justify-center space-x-4">
            {["Monthly", "Annually", "Lifetime", "Pre Paid"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className="px-6 py-2 rounded-full font-semibold text-[#000] transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7BBFFF] data-[state=active]:to-[#2DC9A2] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:rounded-[25px]"
                style={{
                  fontFamily: "Rowdies",
                }}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {["monthly", "annually", "lifetime", "prepaid"].map((tab) => (
            <TabsContent value={tab} key={tab}>
              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {pricingPlans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2,
                      ease: "easeOut",
                    }}
                  >
                    <Card
                      className={`p-6 rounded-xl shadow-md transition-all duration-300 ${
                        plan.highlight
                          ? "bg-gradient-to-br from-[#7BBFFF80] to-[#2DC9A280] border-[0.5px] border-[#171717] shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
                          : "bg-white"
                      }`}
                    >
                      <div className="flex flex-col h-full">
                        <h3 className="text-xl font-semibold text-[#000] mb-4">
                          {plan.name}
                        </h3>
                        <div className="flex items-baseline mb-6">
                          <span className="text-2xl font-semibold text-[#000]">
                            $
                          </span>
                          <span className="text-4xl font-bold text-[#000] mx-1">
                            {plan.monthlyPrice}
                          </span>
                          <span className="text-gray-500">/month</span>
                        </div>

                        <ul className="space-y-4 mb-8 flex-grow">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <Check className="h-5 w-5 text-[#2DC9A2]" />
                              <span className="text-[#545F71] text-sm font-normal">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          className={`w-full py-3 ${
                            plan.name === "Basic Plan"
                              ? "PbasicBtn"
                              : plan.name === "Premium Plan"
                                ? "premiumBtn"
                                : plan.name === "Gold Plan"
                                  ? "PbasicBtn"
                                  : "bg-white border-2 border-[#2DC9A2] text-[#2DC9A2] hover:bg-[#E6FAF8]"
                          }`}
                          style={{
                            fontFamily: "Rowdies",
                          }}
                        >
                          Sign up now
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
