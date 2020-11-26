import * as React from "react";

interface Props {
  img: string;
}

export const HeroBanner: React.FC<Props> = (props: Props) => (
  <div className="flex flex-column w-full border-b-1 bg-deep-champaign">
    <div className="w-1/2 flex items-center text-center justify-center">
      <h1 className="text-5xl font-heading">
        Share your secrets securely.
        <br />
        <a href="#hashify" className="btn-primary">
          Hashify
        </a>
      </h1>
    </div>

    <img className="w-1/2 hero-img-big" src={props.img}></img>
  </div>
);
