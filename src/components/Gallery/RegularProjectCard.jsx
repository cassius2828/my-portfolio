import { TechList } from "./TechList";

export const RegularProjectCard = () => {
    return (
      <div className="project-card text-center  rounded-lg relative transition-all duration-300 ease-in-out hover:bg-gray-800">
        <div className="project-content">
          <h3 className="text-3xl lg:text-6xl my-8">Cool Project</h3>
          <div className="w-full h-full rounded-lg overflow-hidden ">
            <p className="px-8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
              mollitia harum vel, praesentium quidem odio eligendi distinctio,
              nobis id repellat velit eos animi sunt atque laboriosam eaque,
              quaerat fugit architecto.
            </p>{" "}
            {false && (
              // details about project
              <div className="absolute z-30 w-full top-1/2 translate-y-1/2 text-gray-200 pointer-events-none"></div>
            )}
          </div>
        </div>
        <div className=" flex justify-center gap-6">
          <button className="p-4 shadow-md rounded cursor-pointer text-blue-500 border border-blue-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-blue-500 hover:text-white my-12 text-2xl">
            View Live
          </button>
          <button className="p-4 shadow-md rounded cursor-pointer text-blue-500 border border-blue-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-blue-500 hover:text-white my-12 text-2xl">
            View Github
          </button>
        </div>
        {/* tech list  */}
        <h4 className="text-3xl">Technologies Used</h4>
        <TechList />
      </div>
    );
  };
  