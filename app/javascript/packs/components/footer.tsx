import * as React from "react";

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
      <a href="/privacy-policy">&nbsp;Privacy Policy&nbsp;</a>
    </div>
  </div>
);
