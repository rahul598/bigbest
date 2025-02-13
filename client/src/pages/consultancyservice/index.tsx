import { Header } from "../../components/header";
import Banner from "../../components/banner";
import { Hero } from "../../components/hero";
import { VideoSection } from "../../components/video-section";
import { FeatureSection } from "../../components/feature-section";
import { ResultsSection } from "../../components/results-section";
import { WhyChooseSection } from "../../components/why-choose-section";
import { TestimonialSection } from "../../components/testimonial-section";
import { PricingSection } from "../../components/pricing-section";
import { FAQSection } from "../../components/faq-section";
import { Footer } from "../../components/footer";

export default function ConsultancyService() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative">
        <Banner title="Consultancy" />
        <FeatureSection />
        <TestimonialSection />
        <PricingSection />
        <ResultsSection />
        <WhyChooseSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
