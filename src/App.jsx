// import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Landing from "./components/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShowProject from "./components/Projects/ShowProject";
import ManageProjects from "./components/Projects/Forms/ManageProjects";
import ShowBlog from "./components/Blogs/ShowBlog";
import BlogManager from "./components/Blogs/BlogManager";
import DisplayBlogs from "./components/Blogs/DisplayBlogs";
import Login from "./components/Auth/Login";
import Header from "./components/Header/Header";
import "react-quill/dist/quill.snow.css";
import Enable2FA from "./components/Auth/Enable2FA";
import ConfirmMFA from "./components/Auth/ConfirmMFA";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Nav /> */}
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/enable-2fa" element={<Enable2FA />} />
          <Route path="/auth/verify-2fa" element={<ConfirmMFA />} />
          <Route path="/blogs" element={<DisplayBlogs />} />
          <Route path="/blogs/new" element={<BlogManager />} />
          <Route path="/blogs/:blogId/edit" element={<BlogManager />} />
          <Route path="/blogs/:blogId" element={<ShowBlog />} />
          <Route
            path="/projects/:projectId/edit"
            element={<ManageProjects />}
          />
          <Route path="/projects/:projectId" element={<ShowProject />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
