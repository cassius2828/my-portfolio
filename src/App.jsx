import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Landing from "./components/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectDetailsModal from "./components/Projects/ProjectDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsModal />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
