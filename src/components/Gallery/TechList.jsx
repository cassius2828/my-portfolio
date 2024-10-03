import { faNodeJs, faReact } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const techListData = [
  {
    name: "React",
    icon: faReact,
  },
  {
    name: "Node JS",
    icon: faNodeJs,
  },
  {
    name: "Node JS",
    icon: faNodeJs,
  },
  {
    name: "Node JS",
    icon: faNodeJs,
  },
  {
    name: "Node JS",
    icon: faNodeJs,
  },
  {
    name: "Node JS",
    icon: faNodeJs,
  },
  {
    name: "Node JS",
    icon: faNodeJs,
  },
  {
    name: "Node JS",
    icon: faNodeJs,
  },
  {
    name: "Node JS",
    icon: faNodeJs,
  },
];
export const TechList = () => {
  return (
    <ul className="tech-list flex flex-wrap gap-4 my-6 h-96 p-2 justify-center overflow-y-scroll text-2xl w-full  custom-scrollbar ">
      {techListData.map((item) => {
        return (
          <li
            key={item.name + item.idx}
            className="tech-list-item bg-blue-400 p-4 mx-4 rounded-3xl shadow-lg gap-6 flex items-center w-40 h-20"
          >
            {item.name}
            <FontAwesomeIcon icon={item.icon} />
          </li>
        );
      })}
    </ul>
  );
};
