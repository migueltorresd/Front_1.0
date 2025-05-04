import {
  Hero,
  History,
  Values,
  Team,
  Partners,
} from "@/components/pages/about/sections";
import SectionDivider from "@/components/shared/section-divider";

const About = () => {
  return (
    <>
      <Hero />
      <SectionDivider position="top" variant="wave" color="gray-50" />
      <History />
      <SectionDivider variant="simple" color="gray-50" />
      <Values />
      <SectionDivider variant="angle" color="white" />
      <Team />
      <Partners />
    </>
  );
};

export default About;
