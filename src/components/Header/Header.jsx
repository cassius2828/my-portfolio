import { Link } from "react-router-dom";
import IconList from "../SocialMedia/IconList";
const navList = [
  {
    name: "Home",
    link: "/",
  },
  { name: "About", link: "/#about" },
  { name: "Blogs", link: "/blogs" },
  { name: "Contact", link: "/#contact" },
];
const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 shadow-md fixed z-50 w-full top-0 h-32 flex">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold">
          Cassius Reynolds | Full Stack Developer
        </div>

        {/* Navigation Links */}
        <NavList list={navList} />
      </div>
    </header>
  );
};

export default Header;

export const NavList = ({ list }) => {
  return (
    <nav>
      <ul className="flex items-center space-x-12 text-xl">
        {list.map((item, idx) => (
          <li key={idx}>
            <Link to={item.link} className="hover:text-blue-500">
              {item.name}
            </Link>
          </li>
        ))}
        <IconList />
      </ul>
    </nav>
  );
};
