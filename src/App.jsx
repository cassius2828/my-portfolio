import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Landing from "./components/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShowProject from "./components/Projects/ShowProject";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/projects/:projectId" element={<ShowProject />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
