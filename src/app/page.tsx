import { RegistrationSection } from "@/components/sections/RegistrationSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { CTASection } from "@/components/sections/CTASection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TransformationsPreview } from "@/components/sections/TransformationsPreview";
import { FAQSection } from "@/components/sections/FAQSection";

export default function HomePage() {
  return (
    <>
      <RegistrationSection />
      <TransformationsPreview />
      <ReviewsSection />
      <HowItWorks />
      <FAQSection />
      <CTASection />
    </>
  );
}
