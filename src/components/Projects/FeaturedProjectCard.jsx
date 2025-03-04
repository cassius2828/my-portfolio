import { useGlobalContext } from "../../context/useGlobalContext";
import { Link } from "react-router-dom";

export const FeaturedProjectCard = ({
  title,
  img,
  description,
  prodLink,
  githubLink,
  videoLink,
  id,
}) => {
  const { fallbackImg } = useGlobalContext();
  const preLoadUrl = () => {
    const image = new Image();
    image.src = img;
  };
  return (
    <>
      <div className="project-card text-center rounded-lg relative flex justify-center flex-col items-center ">
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
          {videoLink && (
            <Link target="_blank" rel="noreferrer" to={videoLink || "/"}>
              <button className="p-4 shadow-md rounded cursor-pointer text-blue-500 border border-blue-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-blue-500 hover:text-white my-2 text-2xl">
                See Demo!
              </button>
            </Link>
          )}

          <Link target="_blank" rel="noreferrer" to={prodLink || "/"}>
            <button className="p-4 shadow-md rounded cursor-pointer text-blue-500 border border-blue-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-blue-500 hover:text-white my-2 text-2xl">
              See Live!
            </button>
          </Link>
          <Link target="_blank" rel="noreferrer" to={githubLink || "/"}>
            <button className="p-4 shadow-md rounded cursor-pointer text-blue-500 border border-blue-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-blue-500 hover:text-white my-2 text-2xl">
              View Github
            </button>
          </Link>
        </div>
        <div>
          <Link
            onMouseEnter={preLoadUrl}
            to={`projects/${id}`}
            className="text-gray-100 relative top-5 cursor-pointer"
          >
            more details
          </Link>
        </div>
      </div>
    </>
  );
};
