import * as React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import ContactForm from "./contact_form";

const imgURL = "https://res.cloudinary.com/drg9hguhu/image/upload/v1605004642/flame-online-advertising_zujffx.png";

export const Contact: React.FC = () => (
  <>
    <Header img={imgURL} />
    <h1 className="text-4xl text-center my-4 font-heading">
      Get in touch with us!
    </h1>
    <div className="font-body font-normal text-xl container -my-6 mx-auto lg:px-16 md:px-8 sm:px-8 my-8">
      <div className="flex flex-wrap -my-8 sm:w-100">
        <div className="w-full px-4 flex items-center justify-center">
          <ContactForm />
        </div>
      </div>
    </div>
    <Footer />
  </>
);
