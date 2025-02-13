import Banner from "../../components/banner";
import {TestimonialSection} from "../../components/testimonial-section";
import {FAQSection} from "../../components/faq-section";
import BuildConfidence from "../../components/buildconfidence";
import MockExamSection from "../../components/mockexam/exam-tailored";
export default function TuitionServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      
      <main className="relative">
      <Banner title="Mock Exam"/>
      <BuildConfidence />
      <MockExamSection />
       <TestimonialSection />
        <FAQSection/>
      </main>
    </div>
  );
}