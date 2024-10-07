import { useEffect, useState } from "react";
import {
  getFeaturedProjects,
  getRegularProjects,
} from "../../service/projectsService";
import { FeaturedProjectCard } from "./FeaturedProjectCard";
import { RegularProjectCard } from "./RegularProjectCard";
import { useGlobalContext } from "../../context/useGlobalContext";

const Gallery = () => {


  return (
    <section id="gallery">
      <div id="featured-gallery">
        {/* <h2 className="text-center mb-24 text-8xl">Featured Projects</h2> */}
        {/* featured row */}
        {/* <div className="row grid grid-cols-1 lg:grid-cols-3 gap-20 mx-12">
          {/* individual project card 
          <ul>
            {featuredProjects.map((project, idx) => {
              console.log(`this is project of index ${idx}\n ${project}`);
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
        </div> */}
        {/* regular projects */}
        <h2 className="text-center my-24 text-8xl">Other Projects</h2>

        <div className="row grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-28 mx-12">
          {/* <ul>
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
                />
              );
            })}
          </ul> */}
        </div>
      </div>
    </section>
  );
};
export default Gallery;
