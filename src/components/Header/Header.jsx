import { Link, useLocation, useNavigate } from "react-router-dom";
import IconList from "../SocialMedia/IconList";
import { useAuthContext } from "../../context/auth/useAuthContext";
import { useGlobalContext } from "../../context/useGlobalContext";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 shadow-md fixed z-50 w-full top-0 h-32 flex">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold">
          Cassius Reynolds | Full Stack Developer
        </div>

        {/* Navigation Links */}
        <NavList />
      </div>
    </header>
  );
};

export default Header;

export const NavList = () => {
  const { user, handleLogout } = useAuthContext();
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
      <ul className="flex items-center space-x-12 text-2xl">
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
        {user._id === import.meta.env.VITE_REACT_APP_ADMIN_ID && (
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
    </nav>
  );
};
