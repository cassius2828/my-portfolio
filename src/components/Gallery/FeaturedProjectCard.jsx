import { useState } from "react";
import { TechList } from "./TechList";
import { useGlobalContext } from "../../context/useGlobalContext";
import { Link } from "react-router-dom";
import ProjectDetailsModal from "../Modals/ProjectDetails";

export const FeaturedProjectCard = ({
  title,
  img,
  description,
  prodLink,
  githubLink,
  technologies,
}) => {
  const [showMore, setShowMore] = useState(false);
  const { fallbackImg } = useGlobalContext();

  return (
    <>
      <div className="project-card text-center rounded-lg relative flex justify-center flex-col items-center">
        <div className="project-content">
          <h3 className="text-2xl lg:text-3xl my-8">{title}</h3>
          <div className="w-[35rem] rounded-lg overflow-hidden relative shadow-lg hover:shadow-blue-lg">
            <img
              className="w-full h-full"
              src={img || fallbackImg}
              alt={description}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-6">
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
        <div>
          <span
            onClick={() => setShowMore((prev) => !prev)}
            className="text-gray-100 relative top-5 cursor-pointer"
          >
            {showMore ? "hide details" : "more details"}
          </span>
        </div>
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

/*

 {showMore && (
        <div>
          {/* // details about project 
          <div className="my-8 text-xl leading-10">
            <p className="text-start px-8">{description}</p>
          </div>
          {/* // techlist 
          <h4 className="text-3xl">Technologies Used</h4>
          <TechList technologies={technologies} />
        </div>
      )}
*/
