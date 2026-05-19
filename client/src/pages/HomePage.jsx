import HeroSection from '../components/sections/HeroSection';
import FeaturedDestinations from '../components/sections/FeaturedDestinations';
import FeaturedPackages from '../components/sections/FeaturedPackages';
import { WhyChooseUs, StatsSection } from '../components/sections/WhyChooseUs';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import GallerySection from '../components/sections/GallerySection';
import CTASection from '../components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedDestinations />
      <StatsSection />
      <FeaturedPackages />
      <WhyChooseUs />
      <GallerySection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
