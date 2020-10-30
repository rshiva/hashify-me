import * as React from "react";
import { Navbar } from "./navbar";
import { HeroBanner } from "./hero_banner";

export const Header: React.FC = () => (
  <>
    <header>
      <Navbar />
    </header>
    <HeroBanner />
  </>
);
