// src/components/About.jsx

import {
  faCertificate,
  faGraduationCap,
  faLaptop,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons/faMoneyBill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const idealBio = `I am a passionate software engineer with strong expertise in React, Express, MongoDB, PostgreSQL, and JavaScript. My skill set also includes Tailwind, CSS, HTML, SASS, Bootstrap, and building RESTful APIs. Additionally, I have a working knowledge of Python, Django, Cypress, TypeScript, AWS, system design, cloud infrastructure, GraphQL, and deployment processes.

Since starting my coding journey in December 2022, I’ve graduated from General Assembly’s Software Engineering Bootcamp (2024), earned over 5 programming certifications, and completed numerous real-world freelance projects. I bring team-oriented skills, honed through collaboration with mid- and senior-level engineers on various group projects, along with managerial experience from previous roles.

I hold a BA in Communication Studies and plan to further my education with a BS in Computer Science. I’m continuously refining my skills while contributing to ongoing freelance projects, and I’m driven to build efficient, scalable solutions.
`;
const About = () => {
  return (
    <section id="about" className="h-screen w-full bg-[#080404]  relative">
      {/* banner */}
      <div className="w-full bg-blue-500 py-12 md:p-12 flex items-center justify-around">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          <span className="text-xl md:text-3xl">1+ Years Expereince</span>
          <FontAwesomeIcon className="text-xl md:text-3xl" icon={faLaptop} />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          <span className="text-xl md:text-3xl">Free Lance Experience</span>
          <FontAwesomeIcon className="text-xl md:text-3xl" icon={faMoneyBill} />
        </div>{" "}
        <div className="flex flex-col md:flex-row  items-center justify-center gap-4 text-center">
          <span className="text-xl md:text-3xl">5+ certifications</span>
          <FontAwesomeIcon
            className="text-xl md:text-3xl"
            icon={faCertificate}
          />
        </div>{" "}
        <div className="flex flex-col md:flex-row  items-center justify-center gap-4 text-center">
          <span className="text-xl md:text-3xl">
            General Assembly Graduate 2024
          </span>
          <FontAwesomeIcon
            className="text-xl md:text-3xl"
            icon={faGraduationCap}
          />
        </div>
      </div>
      <div className="p-12 flex flex-col lg:flex-row justify-center ">
        <div className="w-full lg:w-1/3  mt-24">
          <h2 className="text-4xl md:text-6xl font-bold border-b pb-3">About Me</h2>

          <p className="mt-4 text-2xl md:text-3xl md:leading-10">
            I am a passionate software engineer with strong expertise in React,
            Express, MongoDB, PostgreSQL, and JavaScript. My skill set also
            includes Tailwind, CSS, HTML, SASS, Bootstrap, and building RESTful
            APIs. Additionally, I have a working knowledge of Python, Django, Remix, Nextjs,
            Cypress, TypeScript, AWS, system design, cloud infrastructure,
            GraphQL, and deployment processes.
            <br />
            <br />
            Since starting my coding journey in December 2022, I’ve graduated
            from General Assembly’s Software Engineering Bootcamp (2024), earned 5 programming certifications, currently working on adding another 4, and completed numerous
            real-world freelance projects. I bring team-oriented skills, honed
            through collaboration with mid- and senior-level engineers on
            various group projects, along with managerial experience from
            previous roles. I hold a BA in Communication Studies and plan to
            further my education with a BS in Computer Science.
            <br />
            <br />
            I’m continuously refining my skills while contributing to ongoing
            freelance projects, and I’m driven to build efficient, scalable
            solutions.
          </p>
        </div>
        <div className=" md:w-1/3  justify-center md:ml-20 hidden lg:flex">
          <img className="w-full object-contain" src="/images/api-programming.png" alt="3D programming icons, bright blue and smooth gray" />
        </div>
      </div>
    </section>
  );
};

export default About;
