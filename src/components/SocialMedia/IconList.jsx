import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const IconList = () => {
  return (
    <ul className="text-[#3B82F6] flex items-center gap-12 text-6xl">
      <Link to={`https://github.com/cassius2828`} className="hover:text-[#93C5FD] transition-colors duration-200 ease cursor-pointer">
        <FontAwesomeIcon icon={faGithub} />
      </Link>
      <Link to={`https://www.linkedin.com/in/cassius-reynolds/`} className="hover:text-[#93C5FD] transition-colors duration-200 ease cursor-pointer">
        <FontAwesomeIcon icon={faLinkedin} />
      </Link>
    </ul>
  );
};
export default IconList;
