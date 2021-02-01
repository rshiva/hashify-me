import * as React from "react";
import { Navbar } from "./navbar";
import { HeroBanner } from "./hero_banner";

interface Props {
  page: string;
  title?: string;
}

export const Header: React.FC<Props> = (props: Props) => (
  <>
    <header>
      <Navbar />
    </header>
    <HeroBanner page={props.page} />
  </>
);
