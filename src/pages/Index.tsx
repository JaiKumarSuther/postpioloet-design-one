import { Suspense } from 'react'
import ThreeBackground from '@/components/ThreeBackground'
import HeroSection from '@/components/HeroSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import BenefitsSection from '@/components/BenefitsSection'
import PricingSection from '@/components/PricingSection'
import FAQSection from '@/components/FAQSection'

const Index = () => {
  return (
    <main className="relative">
      {/* Three.js Background */}
      <Suspense fallback={<div className="fixed inset-0 bg-background -z-10" />}>
        <ThreeBackground />
      </Suspense>

      {/* Page Sections */}
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <PricingSection />
      <FAQSection />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-glass-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-primary mb-2">PostPilot AI</h3>
              <p className="text-muted-foreground">
                AI-powered content creation that scales
              </p>
            </div>
            
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="animated-link hover:text-primary">Privacy Policy</a>
              <a href="#" className="animated-link hover:text-primary">Terms of Service</a>
              <a href="#" className="animated-link hover:text-primary">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-glass-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 PostPilot AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;