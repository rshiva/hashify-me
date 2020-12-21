import * as React from "react";
import { TeamUp } from "./icons/team_up";
import { ContactUs } from "./icons/contact_us";

interface Props {
  page: string;
}

const showHeaderImage = (page: string) => {
  switch (page) {
    case "home":
      return (<TeamUp />);
    case "contact":
      return (<ContactUs />);
  }
}

export const HeroBanner: React.FC<Props> = (props: Props) => (
  <div className="flex flex-column w-full border-b-1 bg-maize-crayola">
    <div className="w-1/2 flex items-center text-center justify-center">
      <h1 className="text-5xl font-heading">
        Share your secrets securely.
        <br />
        <a href="#hashify" className="btn-primary">
          Hashify
        </a>
      </h1>
    </div>

    <div className="w-1/2 sm:w-full sm:h-auto hero-img">
      {showHeaderImage(props.page)}
    </div>
  </div>
);
