import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Landing from "./components/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
