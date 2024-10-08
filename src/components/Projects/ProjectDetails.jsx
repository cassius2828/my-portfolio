import { Link, useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/useGlobalContext";
import { TechList } from "./TechList";
import { useEffect } from "react";

const ShowProject = () => {
  const { fallbackImg, scrollToTop, showProject, fetchProjectById, isLoading } =
    useGlobalContext();
  const { img, title, description, technologies, prodLink, githubLink } =
    showProject || {};
  const navigate = useNavigate();
  const { projectId } = useParams();

  useEffect(() => {
    scrollToTop();

    fetchProjectById(projectId);
  }, []);
  if (isLoading) return <h1>loading...</h1>;
  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 z-[60] flex items-start bg-black"></div>

      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-screen md:w-[75vw] my-24 z-[100] bg-gray-800 rounded-md p-8 text-xl flex flex-col items-center justify-center gap-8  ">
        <span
          onClick={() => navigate(-1)}
          className="absolute top-2 right-4 cursor-pointer text-5xl"
        >
          x
        </span>
        <span className="absolute top-20 right-12 animate-bounce">
          scroll to see more &#x2193;
        </span>

        <h3 className="text-5xl font-bold">{title}</h3>
        <img
          className="w-3/4 mx-auto max-h-[50rem] object-cover"
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
    </>
  );
};
export default ShowProject;