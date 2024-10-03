// src/components/Contact.jsx
import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="h-screen bg-gray-700 relative">
      <div className="absolute h-full w-full bg-[#080404]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>
      <div className="relative">
        <h2 className="text-3xl font-bold pt-20 text-center text-gray-100">
          Contact Me Today
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center  py-10 gap-12">
          <div className="rounded-md bg-gray-800 w-full md:w-auto p-8 text-gray-100 shadow-lg">
            <p className="mb-4">
              <span className="text-xl font-semibold">Cell:</span> (707)
              724-1815
            </p>
            <p className="mb-4">
              <span className="text-xl font-semibold">Email:</span>{" "}
              <a
                href="mailto:cassius.reynolds.dev@gmail.com"
                className="text-blue-400 hover:underline"
              >
                cassius.reynolds.dev@gmail.com
              </a>
            </p>
            <p className="mb-4">
              <span className="text-xl font-semibold">LinkedIn:</span>{" "}
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                Cassius Reynolds
              </a>
            </p>
            <p>
              <span className="text-xl font-semibold">GitHub:</span>{" "}
              <a
                href="https://github.com/cassius2828"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                github/cassius2828
              </a>
            </p>
          </div>
          <form className="mt-4 w-full max-w-md bg-gray-800 p-8 rounded-md shadow-lg">
            <div className="mb-4">
              <label className="block text-gray-200 mb-2">Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-200 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-200 mb-2">Subject</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              ></input>
            </div>
            <div className="mb-4">
              <label className="block text-gray-200 mb-2">Message</label>
              <textarea className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
