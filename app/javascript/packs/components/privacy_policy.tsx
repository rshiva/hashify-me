import * as React from "react";
import { Header } from "./header";
import { Footer } from "./footer";

const iframe = '<iframe src="https://docs.google.com/document/d/1p4xpEO9oqlQtLFjxSFYCKYVmPut5_1lixwXsIletfQ0/edit?usp=sharing" width="640" height="480"></iframe>';
function renderIframe() {
    return {
        __html: iframe
    }
}

export const PrivacyPolicy: React.FC = () => (
    <>
        <Header page="contact" title="Privacy Policy" />
        <h1 className="text-4xl text-center my-4 font-heading">
            Privacy Policy
    </h1>
        <div id="policy" className="font-body font-normal text-xl container mx-auto lg:px-16 md:px-8 sm:px-8 my-8">
            <div className="flex flex-wrap sm:w-100">
                <div className="w-full px-4 flex items-center justify-center">
                    <div dangerouslySetInnerHTML={renderIframe()} />
                </div>
            </div>
        </div>
        <Footer />
    </>
);
