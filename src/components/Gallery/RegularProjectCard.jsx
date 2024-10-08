import { Link } from "react-router-dom";
import { TechList } from "./TechList";
import { useState } from "react";
import ProjectDetailsModal from "../Modals/ProjectDetails";

export const RegularProjectCard = ({
  title,
  img,
  description,
  technologies,
  prodLink,
  githubLink,
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <div className="project-card text-center  rounded-lg relative transition-all duration-300 ease-in-out hover:bg-gray-800">
        <div className="project-content">
          <h3 className="text-3xl lg:text-6xl my-8">{title}</h3>
          <div className="w-full h-full rounded-lg overflow-hidden ">
            <p className="px-8">{description}</p>{" "}
            {false && (
              // details about project
              <div className="absolute z-30 w-full top-1/2 translate-y-1/2 text-gray-200 pointer-events-none"></div>
            )}
          </div>
        </div>
        <div className=" flex justify-center gap-6">
          <Link to={prodLink || "/"}>
            <button className="p-4 shadow-md rounded cursor-pointer text-blue-500 border border-blue-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-blue-500 hover:text-white my-12 text-2xl">
              See Live!
            </button>
          </Link>
          <Link to={githubLink || "/"}>
            <button className="p-4 shadow-md rounded cursor-pointer text-blue-500 border border-blue-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-blue-500 hover:text-white my-12 text-2xl">
              View Github
            </button>
          </Link>
        </div>
        <span
          onClick={() => setShowMore((prev) => !prev)}
          className="text-gray-100 relative -top-5 cursor-pointer"
        >
          {showMore ? "hide details" : "more details"}
        </span>
        {/* tech list  */}
        <h4 className="text-3xl">Technologies Used</h4>
        <TechList technologies={technologies} />
      </div>
      {showMore && (
        <ProjectDetailsModal
          technologies={technologies}
          img={img}
          title={title}
          description={description}
          prodLink={prodLink}
          githubLink={githubLink}
          handleClose={() => setShowMore(false)}
        />
      )}
    </>
  );
};
