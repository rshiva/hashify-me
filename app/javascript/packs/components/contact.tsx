import * as React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import ContactForm from "./contact_form";

export const Contact: React.FC = () => (
  <>
    <Header page="contact" />
    <h1 className="text-4xl text-center my-4 font-heading">
      Get in touch with us!
    </h1>
    <div className="font-body font-normal text-xl container mx-auto lg:px-16 md:px-8 sm:px-8 my-8">
      <div className="flex flex-wrap sm:w-100">
        <div className="w-full px-4 flex items-center justify-center">
          <ContactForm />
        </div>
      </div>
    </div>
    <Footer />
  </>
);
