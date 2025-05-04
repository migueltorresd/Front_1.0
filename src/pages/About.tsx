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
      <SectionDivider position="top" variant="wave" color="orange-50" />
      <History />
      <SectionDivider variant="simple" color="orange-50" />
      <Values />
      <SectionDivider variant="angle" color="orange-50" />
      <Team />
      <Partners />
    </>
  );
};

export default About;
