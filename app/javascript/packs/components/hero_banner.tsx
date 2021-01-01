import * as React from "react";
import { TeamUp } from "./icons/team_up";
import { ContactUs } from "./icons/contact_us";
import { HashLink as Link } from 'react-router-hash-link';
import { Unlock } from "./icons/unlock";

interface Props {
  page: string;
  title: string;
}

const showHeaderImage = (page: string) => {
  switch (page) {
    case "home":
      return (<TeamUp />);
    case "contact":
      return (<ContactUs />);
    case "secret":
      return (<Unlock />);
  }
}

const buttonLink = (page: string) => {
  switch (page) {
    case "home":
      return (<Link to="#hashify" className="btn-primary">Hashify</Link>);
    case "contact":
      return (<Link to="#contact" className="btn-primary">Contact Us</Link>);
    case "secret":
      return (<Link to="#secret" className="btn-primary">Secret</Link>);
  }
}

export const HeroBanner: React.FC<Props> = (props: Props) => (
  <div className="flex flex-column w-full border-b-1 bg-maize-crayola">
    <div className="w-1/2 flex items-center text-center justify-center">
      <h1 className="text-5xl font-heading">
        Share your secrets securely.
        <br />
        {buttonLink(props.page)}
      </h1>
    </div>

    <div className="w-1/2 sm:w-full sm:h-auto hero-img">
      {showHeaderImage(props.page)}
    </div>
  </div>
);
