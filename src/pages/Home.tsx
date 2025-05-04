import {
  Hero,
  Stats,
  ProblemsAndSolutions,
  Features,
  Testimonials,
  CTA,
} from "@/components/pages/home/sections";
import SectionDivider from "@/components/shared/section-divider";

const Home = () => {
  return (
    <>
      <Hero />
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
