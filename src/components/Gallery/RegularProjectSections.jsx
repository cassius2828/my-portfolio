import ParabolaGradient from "../Backgrounds/ParabolaGradient";
import { RegularProjectCard } from "./RegularProjectCard";

const RegularProjectSections = () => {
  return (
    <section className="relative min-h-screen w-screen">
      <ParabolaGradient />
      <div className="w-full mt-96">
        <h2 className="text-center text-6xl font-bold relative z-30">More Projects</h2>
        <hr className="w-1/5 mx-auto h-3 bg-gray-100 border-none mt-5 relative z-30" />
      </div>
      <div className="row grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-28 mx-12 pt-20 border-t relative z-30 ">
        <RegularProjectCard />
        <RegularProjectCard />
        <RegularProjectCard />
        <RegularProjectCard />
        <RegularProjectCard />
        <RegularProjectCard />
        <RegularProjectCard />
      </div>
    </section>
  );
};
export default RegularProjectSections;
