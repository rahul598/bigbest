import { Header } from "../../components/header";
import { Hero } from "../../components/hero";
import Banner from "../../components/banner";
import { VideoSection } from "../../components/video-section";
import { FeatureSection } from "../../components/feature-section";
import { ResultsSection } from "../../components/results-section";
import { WhyChooseSection } from "../../components/why-choose-section";
import { TestimonialSection } from "../../components/testimonial-section";
import { PricingSection } from "../../components/pricing-section";
import { FAQSection } from "../../components/faq-section";
import { Footer } from "../../components/footer";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="relative">
        <Banner title="FAQ" />
        <FAQSection />
      </main>
    </div>
  );
}
