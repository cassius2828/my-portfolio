import React from "react";
import Nav from "./components/Nav";
import Landing from "./components/Landing";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { RegularProjectCard } from "./components/Gallery/RegularProjectCard";
import ParabolaGradient from "./components/Backgrounds/ParabolaGradient";
import RegularProjectSections from "./components/Gallery/RegularProjectSections";

function App() {
  return (
    <>
      <Nav />
      <Landing />
      <RegularProjectSections />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
