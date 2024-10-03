

import { FeaturedProjectCard,  } from "./FeaturedProjectCard";
import { RegularProjectCard } from "./RegularProjectCard";

const Gallery = () => {
  return (
    <section id="gallery">
      <div id="featured-gallery">
        <h2 className="text-center mb-24 text-8xl">Featured Projects</h2>
        {/* featured row */}
        <div className="row grid grid-cols-1 lg:grid-cols-3 gap-20 mx-12">
          {/* individual project card */}
          <FeaturedProjectCard />
          <FeaturedProjectCard />
          <FeaturedProjectCard />
        </div>
        {/* regular projects */}
        <h2 className="text-center my-24 text-8xl">Other Projects</h2>

        <div className="row grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-28 mx-12">
          <RegularProjectCard />
          <RegularProjectCard />
          <RegularProjectCard />
          <RegularProjectCard />
          <RegularProjectCard />
          <RegularProjectCard />
          <RegularProjectCard />
        </div>
      </div>
    </section>
  );
};
export default Gallery;





