import About from "../About";
import Contact from "../Contact";
import RegularProjectSections from "../Gallery/RegularProjectSections";
import Hero from "../Hero";

const Landing = () => {
  return (
    <>
      <Hero />
      <RegularProjectSections />
      <About />
      <Contact />
    </>
  );
};
export default Landing;
