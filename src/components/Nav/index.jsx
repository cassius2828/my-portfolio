// src/components/Nav.jsx
import React from "react";

const Nav = () => {
  return (
    <nav className=" p-4 fixed top-0 z-30 w-full  ">
      <ul className="flex space-x-4 justify-end  text-white text-2xl">
        <li>
          <a href="#landing">Home</a>
        </li>
        <li>
          <a href="#about">About Us</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
