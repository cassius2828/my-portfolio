import { Link, useLocation, useNavigate } from "react-router-dom";
import IconList from "../SocialMedia/IconList";
import { useAuthContext } from "../../context/auth/useAuthContext";
import { useGlobalContext } from "../../context/useGlobalContext";
import { useState } from "react";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 shadow-md fixed z-50 w-full top-0 h-32 flex">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to={"/"} className="text-2xl font-bold">
          Cassius Reynolds | Full Stack Developer
        </Link>

        {/* Navigation Links */}
        <NavList />
      </div>
    </header>
  );
};

export default Header;

export const NavList = () => {
  const { user, handleLogout } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const { scrollToTop } = useGlobalContext();
  const navigate = useNavigate();
  const location = useLocation();
  // Function to handle navigation and scrolling
  const handleNavigationAndScroll = (id) => {
    if (location.pathname !== "/") {
      // Navigate to home first, then scroll after navigation
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // Adjust delay to ensure DOM is updated after navigation
    } else {
      // If already on the home page, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <nav>
      <ul className=" items-center space-x-12 text-2xl hidden md:flex">
        <li>
          <Link
            onClick={location.pathname === "/" ? scrollToTop : null}
            to="/"
            className="hover:text-blue-500"
          >
            Home
          </Link>
        </li>
        <li>
          <button
            onClick={() => handleNavigationAndScroll("about")}
            className="hover:text-blue-500"
          >
            About
          </button>
        </li>
        <li>
          <Link to="/blogs" className="hover:text-blue-500">
            Blogs
          </Link>
        </li>
        {user?._id === import.meta.env.VITE_REACT_APP_ADMIN_ID && (
          <li>
            <Link to="/blogs/new" className="hover:text-blue-500">
              Create Blog
            </Link>
          </li>
        )}

        <li>
          <button
            onClick={() => handleNavigationAndScroll("contact")}
            className="hover:text-blue-500"
          >
            Contact
          </button>
        </li>
        {user ? (
          <li>
            <button
              onClick={handleLogout}
              className="hover:text-blue-500 transition"
            >
              Sign Out
            </button>
          </li>
        ) : (
          <li>
            <Link to="/auth/login" className="hover:text-blue-500">
              Login
            </Link>
          </li>
        )}
        <IconList />
      </ul>
      {/* Mobile */}
      <ul
        onClick={() => setIsOpen(false)}
        className={`items-center text-2xl md:hidden flex flex-col h-screen bg-gray-900 w-screen absolute translate-y-0 left-0 ${
          isOpen ? "" : " opacity-0 pointer-events-none -translate-y-full"
        } transition-all duration-200 justify-around `}
      >
        <li>
          <Link
            onClick={location.pathname === "/" ? scrollToTop : null}
            to="/"
            className="hover:text-blue-500"
          >
            Home
          </Link>
        </li>
        <li>
          <button
            onClick={() => handleNavigationAndScroll("about")}
            className="hover:text-blue-500"
          >
            About
          </button>
        </li>
        <li>
          <Link to="/blogs" className="hover:text-blue-500">
            Blogs
          </Link>
        </li>
        {user?._id === import.meta.env.VITE_REACT_APP_ADMIN_ID && (
          <li>
            <Link to="/blogs/new" className="hover:text-blue-500">
              Create Blog
            </Link>
          </li>
        )}

        <li>
          <button
            onClick={() => handleNavigationAndScroll("contact")}
            className="hover:text-blue-500"
          >
            Contact
          </button>
        </li>
        {user ? (
          <li>
            <button
              onClick={handleLogout}
              className="hover:text-blue-500 transition"
            >
              Sign Out
            </button>
          </li>
        ) : (
          <li>
            <Link to="/auth/login" className="hover:text-blue-500">
              Login
            </Link>
          </li>
        )}
        <IconList />
      </ul>
      <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};

export const Hamburger = ({ onToggle, isOpen, setIsOpen }) => {
  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (onToggle) onToggle(!isOpen); // Notify parent component
  };

  return (
    <button
      onClick={handleToggle}
      className="flex flex-col items-center justify-between w-12 h-8 focus:outline-none md:hidden relative
      "
      aria-label="Toggle menu"
    >
      {/* Lines of the hamburger */}
      <div
        style={{ height: "2px" }}
        className={`w-full bg-white rounded transition-transform ${
          isOpen ? "rotate-45 translate-y-4" : ""
        }`}
      ></div>
      <div
        style={{ height: "2px" }}
        className={`w-full bg-white rounded transition-opacity ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      ></div>
      <div
        style={{ height: "2px" }}
        className={`w-full bg-white rounded transition-transform ${
          isOpen ? "-rotate-45 -translate-y-3" : ""
        }`}
      ></div>
    </button>
  );
};
