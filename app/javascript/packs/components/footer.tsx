import * as React from "react";

const getYear = () => {
  return new Date().getFullYear();
};

export const Footer: React.FC = () => (
  <div className="text-xl font-logo py-16 sm:py-4">
    <div className="sm:w-full flex items-center justify-center text-center">
      <img src="https://img.icons8.com/ios/50/000000/expeditedssl.png" />
      Hashify &nbsp;/&nbsp; Copyright &#169; {getYear()}
      &nbsp;/&nbsp; Illustrations by{" "}
      <a href="https://icons8.com/illustrations/style--flame" target="blank">
        &nbsp;Ouch!&nbsp;
      </a>{" "}
      from{" "}
      <a href="https://icons8.com" target="blank">
        &nbsp;Icons8&nbsp;
      </a>
    </div>
  </div>
);
