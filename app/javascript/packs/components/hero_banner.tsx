import * as React from "react";

const imgUrl =
  "https://res.cloudinary.com/drg9hguhu/image/upload/v1603795471/flame-1250_iccnjo.png";

export const HeroBanner: React.FC = () => (
  <div className="flex flex-column w-full border-b-1 bg-deep-champaign">
    <div className="w-1/2 flex items-center text-center justify-center">
      <h1 className="text-5xl font-heading">
        Share your secrets securely.
        <br />
        <button className="bg-sandy-brown text-2xl font-heading hover:bg-burnt-sienna hover:text-white font-bold py-2 px-4 border-b-4 border-burnt-sienna hover:border-sandy-brown rounded">
          Start Now
        </button>
      </h1>
    </div>

    <img className="w-1/2 hero-img-big" src={imgUrl}></img>
  </div>
);
