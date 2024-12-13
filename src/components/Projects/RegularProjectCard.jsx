import { Link } from "react-router-dom";
import { TechList } from "./TechList";

export const RegularProjectCard = ({
  title,
  description,
  technologies,
  prodLink,
  githubLink,
  id,
}) => {
  return (
    <>
      <div className="project-card text-center  rounded-lg relative transition-all duration-300 ease-in-out hover:bg-gray-800 border-y md:border-none">
        <div className="project-content">
          <h3 className="text-3xl lg:text-6xl my-8">{title}</h3>
          <div className="w-full h-full rounded-lg overflow-hidden ">
            <p className="px-8 text-xl">{description}</p>{" "}
            {false && (
              // details about project
              <div className="absolute z-30 w-full top-1/2 translate-y-1/2 text-gray-200 pointer-events-none"></div>
            )}
          </div>
        </div>
        <div className=" flex justify-center gap-6">
          <Link target="_blank" rel="noreferrer"  className={prodLink ? '':'cursor-not-allowed'} to={prodLink || "/"}>
            <button className={`${prodLink ? 'text-blue-500  border-blue-500':'text-gray-500  border-gray-500 pointer-events-none'} p-4 shadow-md rounded cursor-pointer  border transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-blue-500 hover:text-white my-12 text-2xl`}>
              See Live!
            </button>
          </Link>
          <Link target="_blank" rel="noreferrer"  to={githubLink || "/"}>
            <button className="p-4 shadow-md rounded cursor-pointer text-blue-500 border border-blue-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-blue-500 hover:text-white my-12 text-2xl">
              View Github
            </button>
          </Link>
        </div>
        <Link
          to={`projects/${id}`}
          className="text-gray-100 relative -top-3 cursor-pointer"
        >
          {/* {showMore ? "hide details" : "more details"}
           */}
          more details
        </Link>
        {/* tech list  */}
        <h4 className="text-3xl">Technologies Used</h4>
        <TechList technologies={technologies} />
      </div>
    </>
  );
};
