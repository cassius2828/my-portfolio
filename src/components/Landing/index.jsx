import About from "../About";
import Contact from "../Contact";
import RegularProjectSections from "../Projects/RegularProjectSections";
import Hero from "../Hero";

import { useGlobalContext } from "../../context/useGlobalContext";
import TempModal from "../Reuseables/TempModal";
import { useEffect } from "react";
import { FixedUtilComponents } from "../UtilComponents/utils";

const Landing = () => {
  const { setShowGuestModal, showGuestModal } = useGlobalContext();

  useEffect(() => {
    setTimeout(() => {
      if (showGuestModal) setShowGuestModal(false);
    }, 5000);
  }, []);
  return (
    <>
      {showGuestModal && <TempModal setShowGuestModal={setShowGuestModal} />}
      <Hero />
      <RegularProjectSections />
      <About />
      <Contact />
      <FixedUtilComponents />
    </>
  );
};
export default Landing;
