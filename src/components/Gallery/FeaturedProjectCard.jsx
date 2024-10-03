import { useState } from "react";
import { TechList } from "./TechList";


export const FeaturedProjectCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="project-card text-center rounded-lg relative flex justify-center flex-col items-center">
      <div className="project-content">
        <h3 className="text-2xl lg:text-3xl my-8">Cool Project</h3>
        <div className="w-[35rem] rounded-lg overflow-hidden relative shadow-lg hover:shadow-blue-lg">
          <img
            className="w-full h-full"
            src="https://themewagon.com/wp-content/uploads/2021/11/purple-react-1.png"
            alt=""
          />
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="absolute h-full  w-full top-0 left-0 flex flex-col justify-center items-center opacity-0 hover:opacity-80 transition-all duration-300 ease-in-out bg-gray-900 "
          ></div>{" "}
          {isHovered && (
            // details about project
            <div className="absolute z-30 w-full top-1/2 translate-y-1/2 text-gray-200 pointer-events-none">
              <p className="pointer-events-none px-8">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat mollitia harum vel, praesentium quidem odio eligendi
                distinctio, nobis id repellat velit eos animi sunt atque
                laboriosam eaque, quaerat fugit architecto.
              </p>
            </div>
          )}
        </div>
      </div>
      <button className="p-4 shadow-md rounded cursor-pointer text-blue-500 border border-blue-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-blue-500 hover:text-white my-12 text-2xl">
        See Live!
      </button>
      {/* tech list  */}
      <h4 className="text-3xl">Technologies Used</h4>
      <TechList />
    </div>
  );
};
