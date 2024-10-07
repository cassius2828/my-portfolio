import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/useGlobalContext";
import { TechList } from "../Gallery/TechList";

const ProjectDetailsModal = ({
  img,
  title,
  description,
  technologies,
  prodLink,
  githubLink,
  handleClose,
}) => {
  const { fallbackImg } = useGlobalContext();

  return (
    <div className="absolute w-screen">
      <div className="w-screen h-screen fixed top-0 z-[60] bg-black"></div>

      <div className="absolute w-screen md:w-[75vw] top-0 -translate-y-1/3 z-[100] bg-gray-800 rounded-md p-8 text-xl flex flex-col items-center justify-center gap-8  ">
        <span
          onClick={handleClose}
          className="absolute top-2 right-4 cursor-pointer text-5xl"
        >
          x
        </span>
     <span className="absolute top-20 right-12 animate-bounce">scroll to see more &#x2193;</span>

        <h3 className="text-5xl font-bold">{title}</h3>
        <img
          className="w-3/4 mx-auto"
          src={img || fallbackImg}
          alt={description}
        />
        <p className="p-4 text-3xl leading-[5rem] w-full md:w-4/5">
          {description}
        </p>
        <hr className="w-4/5 mx-auto h-1 bg-gray-100 border-none mt-5 relative z-10" />
        <h4 className="text-5xl font-bold">Technologies</h4>

        <TechList technologies={technologies} />
        <hr className="w-4/5 mx-auto h-1 bg-gray-100 border-none mt-5 relative z-10" />
        <h4 className="text-5xl font-bold">Links</h4>

        <div className="flex items-center justify-center gap-12 mt-6">
          <Link to={prodLink || "/"}>
            <button className="p-4 shadow-md rounded cursor-pointer text-blue-500 border border-blue-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-blue-500 hover:text-white my-2 text-2xl">
              See Live!
            </button>
          </Link>
          <Link to={githubLink || "/"}>
            <button className="p-4 shadow-md rounded cursor-pointer text-blue-500 border border-blue-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-blue-500 hover:text-white my-2 text-2xl">
              View Github
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProjectDetailsModal;