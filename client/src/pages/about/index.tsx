import { InteractiveEducation } from "../../components/Interactive";
import { ResultsSection } from "../../components/results-section";
import { TestimonialSection } from "../../components/testimonial-section";
import { HowWeWork } from "../../components/howwework/index";
import Banner from "../../components/banner";
import FounderSection from "../../components/FounderSection/index";
import founderData from "../../components/FounderSection/founderData";
export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <main className="relative">
        <Banner title="About Us" />
        <InteractiveEducation />
        <HowWeWork />
        <FounderSection data={founderData} />
        <TestimonialSection />
        <ResultsSection />
      </main>
    </div>
  );
}
