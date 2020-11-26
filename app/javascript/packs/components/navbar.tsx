import * as React from "react";
import { NavLink } from "react-router-dom";

const toggleMenu = (event) => {
  document.querySelector("#burger").classList.toggle("sm:block");
  document.querySelector("#toggleNav").classList.toggle("sm:hidden");
};

export const Navbar: React.FC = () => (
  <nav className="flex items-center justify-between flex-wrap bg-deep-champaign p-6 text-lg">
    <div className="flex items-center flex-no-shrink mr-6 font-logo text-2xl tracking-normal">
      <NavLink
        className="flex items-center"
        to="/"
        exact
      >
        <img src="https://img.icons8.com/ios/50/000000/expeditedssl.png" />
        Hashify
      </NavLink>
    </div>
    <div className="block lg:hidden">
      <button
        className="navbar-burger flex items-center px-3 py-2 border rounded border-ls-blue-jeans hover: hover:border-white"
        aria-label="menu"
        aria-expanded="false"
        id="burger"
        onClick={(event) => toggleMenu(event)}
      >
        <svg
          className="fill-current h-3 w-3 sm:w-10 sm:h-10"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>
    <div
      id="toggleNav"
      className="navbar-menu w-full sm:block flex-grow lg:flex lg:items-center lg:w-auto sm:hidden md:hidden"
    >
      <div className="lg:flex-grow"></div>
      <div>
        <a
          href="#"
          className="text-xl block mt-4 lg:inline-block lg:mt-0 font-title hover:text-middle-blue-green mr-4 navbar-link"
        >
          Share a secret
        </a>
        <NavLink
            className="text-xl block mt-4 lg:inline-block lg:mt-0 font-title hover:text-middle-blue-green mr-4 navbar-link"
            to="/contact"
            exact
        >
          Contact
        </NavLink>
      </div>
    </div>
  </nav>
);
