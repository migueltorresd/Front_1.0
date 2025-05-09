import {
  Hero,
  Stats,
  ProblemsAndSolutions,
  Features,
  Testimonials,
  CTA,
  WelcomeBanner,
} from "@/components/pages/home/sections";
import SectionDivider from "@/components/shared/section-divider";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 pt-8">
        <WelcomeBanner />
      </div>
      <Stats />
      <ProblemsAndSolutions />
      <SectionDivider variant="wave" color="orange-50" />
      <Features />
      <SectionDivider position="top" variant="wave" color="orange-50" />
      <Testimonials />
      <CTA />
    </>
  );
};

export default Home;
