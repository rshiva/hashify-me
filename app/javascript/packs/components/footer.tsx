import * as React from "react";
import { NavLink } from "react-router-dom";

const getYear = () => {
  return new Date().getFullYear();
};

export const Footer: React.FC = () => (
  <div className="text-xl font-logo py-16 sm:py-4">
    <div className="sm:w-full flex items-center justify-center text-center">
      Copyright &#169; {getYear()}
      &nbsp;/&nbsp; Illustrations by{" "}
      <a href="https://undraw.co" target="blank">
        &nbsp;Undraw&nbsp;
      </a>
      &nbsp;/&nbsp;
      <NavLink
        className="text-xl block mt-4 lg:inline-block lg:mt-0 font-title hover:text-white mr-4 navbar-link"
        to="/privacy-policy"
        exact
      >
        Privacy Policy
      </NavLink>
    </div>
  </div>
);
