import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconList = () => {
  return (
    <ul className="text-[#3B82F6] flex items-center gap-12 text-6xl">
      <li className="hover:text-[#93C5FD] transition-colors duration-200 ease cursor-pointer">
        <FontAwesomeIcon icon={faGithub} />
      </li>
      <li className="hover:text-[#93C5FD] transition-colors duration-200 ease cursor-pointer">
        <FontAwesomeIcon icon={faLinkedin} />
      </li>
    </ul>
  );
};
export default IconList;
