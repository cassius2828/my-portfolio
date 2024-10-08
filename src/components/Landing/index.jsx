import About from "../About";
import Contact from "../Contact";
import RegularProjectSections from "../Projects/RegularProjectSections";
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
