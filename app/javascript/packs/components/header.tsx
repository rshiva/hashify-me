import * as React from "react";
import { Navbar } from "./navbar";
import { HeroBanner } from "./hero_banner";

export const Header: React.FC = () => (
  <>
    <header>
      <Navbar />
    </header>
    <HeroBanner />
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#FBD1A2"
        fill-opacity="1"
        d="M0,96L80,101.3C160,107,320,117,480,133.3C640,149,800,171,960,165.3C1120,160,1280,128,1360,112L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      ></path>
    </svg>
  </>
);
