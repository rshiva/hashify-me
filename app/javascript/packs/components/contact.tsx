import * as React from "react";
import { Header } from "./header";
import { Footer } from "./footer";

const imgURL = "https://res.cloudinary.com/drg9hguhu/image/upload/v1605004642/flame-online-advertising_zujffx.png";

export const Contact: React.FC = () => (
  <>
    <Header img={imgURL} />
    <h1 className="text-4xl text-center my-4 font-heading">
      Get in touch with us!
    </h1>
    <div className="font-body font-normal text-xl container -my-6 mx-auto lg:px-16 md:px-8 sm:px-8 my-8">
      <div className="flex flex-wrap -my-8 -mx-1 lg:-mx-2 sm:w-100">
        <div className="w-1/2 px-4">
          <img src="https://res.cloudinary.com/drg9hguhu/image/upload/v1603964931/flame-1235_lfmajl.png" />
        </div>
        <div className="w-1/2 px-4 flex items-center justify-center">
          <p>
            It's really easy to share secrets on your favourite chatting
            software. However, every time you do it, it lives in the database of
            those chat companies forever, exposing you to potential security
            risks. When you submit the form below or use our app / bot for your
            respective platforms, we generate a link that self destructs after
            the specified time.
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </>
);
