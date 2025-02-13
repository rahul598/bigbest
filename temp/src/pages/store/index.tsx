import Banner from "../../components/banner";
import {TestimonialSection} from "../../components/testimonial-section";
import {FAQSection} from "../../components/faq-section";
export default function TuitionServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      
      <main className="relative">
      <Banner title="Store"/>
       <TestimonialSection />
        <FAQSection/>
      </main>
    </div>
  );
}