import * as React from "react";
import { Navbar } from "./navbar";
import { HeroBanner } from "./hero_banner";

interface Props {
  img: string;
}

export const Header: React.FC<Props> = (props: Props) => (
  <>
    <header>
      <Navbar />
    </header>
    <HeroBanner img={props.img} />
  </>
);
