import Banner from "../../components/banner";
import { TestimonialSection } from "../../components/testimonial-section";
import { FAQSection } from "../../components/faq-section";

export default function TuitionPage() {
  return (
    <div className="min-h-screen">
      <main className="relative">
        <Banner title="Tuition" />
        
        <TestimonialSection />
        <FAQSection />
      </main>
    </div>
  );
}
