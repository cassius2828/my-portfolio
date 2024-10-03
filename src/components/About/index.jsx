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

Since starting my coding journey in December 2022, I’ve graduated from General Assembly’s Software Engineering Bootcamp (2024), earned over 15 industry-recognized certifications, and completed numerous real-world freelance projects. I bring team-oriented skills, honed through collaboration with mid- and senior-level engineers on various group projects, along with managerial experience from previous roles.

I hold a BA in Communication Studies and plan to further my education with a BS in Computer Science. I’m continuously refining my skills while contributing to ongoing freelance projects, and I’m driven to build efficient, scalable solutions.
`;
const About = () => {
  return (
    <section id="about" className="h-screen w-full bg-[#080404]  relative">
      {/* banner */}
      <div className="w-full bg-blue-500 p-12 flex items-center justify-around">
        <div className="flex items-center justify-center gap-4">
          <span className="text-3xl">1+ Years Expereince</span>
          <FontAwesomeIcon className="text-3xl" icon={faLaptop} />
        </div>
        <div className="flex items-center justify-center gap-4">
          <span className="text-3xl">Free Lance Experience</span>
          <FontAwesomeIcon className="text-3xl" icon={faMoneyBill} />
        </div>{" "}
        <div className="flex items-center justify-center gap-4">
          <span className="text-3xl">15+ certifications</span>
          <FontAwesomeIcon className="text-3xl" icon={faCertificate} />
        </div>{" "}
        <div className="flex items-center justify-center gap-4">
          <span className="text-3xl">General Assembly Graduate 2024</span>
          <FontAwesomeIcon className="text-3xl" icon={faGraduationCap} />
        </div>
      </div>
      <div className="p-12 flex justify-center  ">
        <div className="w-full md:w-1/3  mt-24">
          <h2 className="text-5xl font-bold border-b pb-3">About Me</h2>
          
          <p className="mt-4 text-2xl">
            I am a passionate software engineer with strong expertise in React,
            Express, MongoDB, PostgreSQL, and JavaScript. My skill set also
            includes Tailwind, CSS, HTML, SASS, Bootstrap, and building RESTful
            APIs. Additionally, I have a working knowledge of Python, Django,
            Cypress, TypeScript, AWS, system design, cloud infrastructure,
            GraphQL, and deployment processes.
            <br />
            <br />
            Since starting my coding journey in December 2022, I’ve graduated
            from General Assembly’s Software Engineering Bootcamp (2024), earned
            over 15 industry-recognized certifications, and completed numerous
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
        <div className="w-full md:w-1/3 flex justify-center ml-20">
          <img className="w-full" src="/images/api-programming.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default About;
