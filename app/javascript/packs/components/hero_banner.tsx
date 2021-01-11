import * as React from "react";
import { Collaboration } from "./icons/collaboration";
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
      return (<Collaboration />);
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
    <div className="w-1/2 md:w-full md:py-4 sm:w-full sm:py-4 flex items-center text-center justify-center">
      <h1 className="text-5xl font-heading">
        {props.title}
        <br />
        {buttonLink(props.page)}
      </h1>
    </div>

    <div className="w-1/2 md:hidden sm:hidden">
      {showHeaderImage(props.page)}
    </div>
  </div>
);
