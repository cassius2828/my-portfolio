import { useEffect } from "react";
import ParabolaGradient from "../Backgrounds/ParabolaGradient";
import { RegularProjectCard } from "./RegularProjectCard";
import { useGlobalContext } from "../../context/useGlobalContext";
import { getRegularProjects } from "../../service/projectsService";

const RegularProjectSections = () => {
  const { fetchProjects, regularProjects, isLoading } = useGlobalContext();

  useEffect(() => {
    fetchProjects("setRegularProjects", getRegularProjects);
  }, []);

  if (isLoading) return <h1 className="text-8xl">Loading...</h1>;
  return (
    <section className="relative min-h-screen w-screen">
      <ParabolaGradient />
      <div className="w-full mt-96">
        <h2 className="text-center text-6xl font-bold relative z-10">
          More Projects
        </h2>
        <hr className="w-1/5 mx-auto h-3 bg-gray-100 border-none mt-5 relative z-10" />
      </div>
      <ul className="row grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-28 mx-12 pt-20 border-t relative z-10 ">
        {regularProjects?.map((project, idx) => {
          return (
            <RegularProjectCard
              key={idx + project.title}
              title={project.title}
              description={project.description}
              img={project.img}
              technologies={project.technologies}
              prodLink={project.prodLink}
              githubLink={project.githubLink}
              id={project._id}
            />
          );
        })}
      </ul>
    </section>
  );
};
export default RegularProjectSections;
