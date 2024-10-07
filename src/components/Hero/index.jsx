// src/components/Hero.jsx
import React, { useEffect } from "react";
import { WavyBackground } from "../ui/wavy-background";
import IconList from "../SocialMedia/IconList";
import { FeaturedProjectCard } from "../Gallery/FeaturedProjectCard";
import { useGlobalContext } from "../../context/useGlobalContext";
import { getFeaturedProjects } from "../../service/projectsService";

const Hero = () => {
  const { fetchProjects, featuredProjects, isLoading } = useGlobalContext();

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
        <div className="w-full flex items-center justify-between p-12">
          {/* col 1 */}
          <div>
            <h1 className="text-[8rem] font-bold mt-6 mb-12 text-gray-100 leading-[8rem]">
              Cassius
              <br /> Reynolds
            </h1>
            <h2 className="text-4xl text-gray-100">Full-Stack Developer</h2>
          </div>
          {/* col 2 */}
          <div className="flex flex-col items-center">
            <IconList />
            <div className="rounded-xl overflow-hidden mt-20 w-96">
              <img
                className=""
                src="https://cdn.prod.website-files.com/5fd2ba952bcd68835f2c8254/654553fedbede7976b97eaf5_Professional-5.remini-enhanced.webp"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* row 2 */}
        <div className="w-full">
          <h2 className="text-center text-6xl font-bold ">Featured Projects</h2>
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
                />
              );
            })}
          </ul>
        </div>
        {/* <div className=" w-1/2">
          <p className="mt-4 text-3xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis
            autem temporibus eveniet quam? Aperiam blanditiis quas dicta
            explicabo exercitationem quae, sunt quisquam velit consectetur,
            consequuntur, quasi alias incidunt cupiditate esse.
          </p>
          <div className="space-x-4 mt-8">
            <button className="border-2 border-blue-500 text-blue-500 text-3xl bg-transparent px-6 py-2 mt-4 rounded transition ease-in-out duration-300 transform hover:bg-blue-500 hover:text-[#f2f2f2] hover:-translate-y-1">
              Projects
            </button>
            <button className="text-blue-500 text-3xl px-6 py-2 mt-4 rounded transition ease-in-out duration-300 transform hover:translate-x-1">
              Contact
            </button>
          </div>
        </div> */}
        {/* <div className="w-1/3 rounded-xl overflow-hidden">
      <img
        className=""
        src="https://cdn.prod.website-files.com/5fd2ba952bcd68835f2c8254/654553fedbede7976b97eaf5_Professional-5.remini-enhanced.webp"
        alt=""
      />
    </div> */}
      </div>
    </section>
  );
};

export default Hero;

/*

     <p className="mt-4 text-3xl w-1/2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis
              autem temporibus eveniet quam? Aperiam blanditiis quas dicta
              explicabo exercitationem quae, sunt quisquam velit consectetur,
              consequuntur, quasi alias incidunt cupiditate esse.
            </p>
            <div className="space-x-4 mt-8">
              <button className="border-2 border-gray-100 text-gray-100 text-3xl bg-transparent px-6 py-2 mt-4 rounded transition ease-in-out duration-300 transform hover:bg-blue-500 hover:text-[#f2f2f2] hover:-translate-y-1">
                Projects
              </button>
              <button className="text-gray-100 text-3xl px-6 py-2 mt-4 rounded transition ease-in-out duration-300 transform hover:translate-x-1">
                Contact
              </button>
*/
