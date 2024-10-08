const devTechnologies = [
  "React",
  "Vite",
  "Node.js",
  "Express",
  "MongoDB",
  "GraphQL",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "Webpack",
  "Docker",
  "Kubernetes",
  "PostgreSQL",
  "Firebase",
  "AWS",
  "Redux",
  "Jest",
  "Cypress",
  "SASS",
  "Socket.io"
];

export const TechList = ({ technologies=devTechnologies }) => {
  return (
    <ul className="tech-list flex flex-wrap gap-4 my-8  p-2 justify-center items-start overflow-y-scroll text-xl md:text-2xl w-full  custom-scrollbar ">
      {technologies?.map((item) => {
        return (
          <li
            key={item.name + item.idx}
            className="tech-list-item bg-blue-400 p-4 mx-4 rounded-3xl shadow-lg flex items-center justify-center w-32 md:w-40 h-16"
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
};
