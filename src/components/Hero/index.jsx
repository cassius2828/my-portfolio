// src/components/Hero.jsx
import { useEffect } from "react";
import { WavyBackground } from "../ui/wavy-background";
import IconList from "../SocialMedia/IconList";
import { FeaturedProjectCard } from "../Projects/FeaturedProjectCard";
import { useGlobalContext } from "../../context/useGlobalContext";
import { getFeaturedProjects } from "../../service/projectsService";

const Hero = () => {
  const { fetchProjects, featuredProjects, isLoading } = useGlobalContext();
  console.log(fetchProjects, " <-- fetch projects func");
  console.log(featuredProjects, " <-- featured projects");
  useEffect(() => {
    fetchProjects("setFeaturedProjects", getFeaturedProjects);
  }, []);
  if (isLoading) return <h1>loading...</h1>;
  return (
    <section
      id="hero"
      className="min-h-screen  flex items-center justify-around mt-12"
    >
      <WavyBackground />
      <div className="flex flex-col items-center justify-between w-10/12 mx-auto relative z-20 ">
        {/* row 1 */}
        <div className="w-full flex items-center justify-between md:p-12">
          {/* col 1 */}
          <div>
            <h1 className="text-4xl md:text-[8rem] font-bold mt-6 mb-12 text-gray-100 md:leading-[8rem]">
              Cassius
              <br /> Reynolds
            </h1>
            <h2 className="text-2xl md:text-4xl text-gray-100">Full-Stack Developer</h2>
          </div>
          {/* col 2 */}
          <div className="flex flex-col items-center">
            <IconList />
            <div className="rounded-xl overflow-hidden mt-20 w-72 md:w-96">
              <img
                className=""
                src="https://cdn.prod.website-files.com/5fd2ba952bcd68835f2c8254/654553fedbede7976b97eaf5_Professional-5.remini-enhanced.webp"
                alt="Cassius Reynolds Headshot"
              />
            </div>
          </div>
        </div>
        {/* row 2 */}
        <div className="w-full">
          <h2 className="text-center text-4xl md:text-6xl font-bold mt-12 md:mt-0">Featured Projects</h2>
          <hr className="w-1/5 mx-auto h-3 bg-gray-100 border-none mt-5" />

          {/* featured row */}
          <ul className="row grid grid-cols-1 lg:grid-cols-3 gap-20 mx-12 border-t border-gray-100 pt-6">
            {/* individual project card */}

            {featuredProjects?.map((project, idx) => {
              return (
                <FeaturedProjectCard
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
