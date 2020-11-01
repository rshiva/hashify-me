import * as React from "react";
import { Header } from "./header";

export const Home: React.FC = () => (
  <>
    <Header />
    <h1 className="text-4xl text-center font-heading my-6">
      Never share insecurely again.
    </h1>
    <div className="font-body font-normal text-xl container mx-auto lg:px-16 md:px-8 sm:px-8">
      <div className="flex flex-wrap -my-8 -mx-1 lg:-mx-2 sm:w-100">
        <div className="w-1/2">
          <img src="https://res.cloudinary.com/drg9hguhu/image/upload/v1603964931/flame-1235_lfmajl.png" />
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <p>
            It's really easy to share secrets on your favourite chatting software. However, every time
            you do it, it lives in the database of those chat companies forever, exposing you to potential
            security risks.
          </p>
        </div>
      </div>
    </div>
    <div className="font-body font-normal text-xl container mx-auto lg:px-16 md:px-8 sm:px-8">
      <div className="flex flex-wrap -my-8 -mx-1 lg:-mx-2 sm:w-100">
        <div className="w-1/2 flex items-center justify-center">
          <form className="max-w-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Secret
                </label>
              </div>
              <div className="md:w-2/3">
                <textarea className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-middle-blue-green" placeholder="Your secret" cols={20} />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Expires in
                </label>
              </div>
              <div className="md:w-2/3">
                <select className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-middle-blue-green">
                  <option value="2 hrs">2 hrs</option>
                  <option value="12 hrs">12 hrs</option>
                  <option value="24 hrs">24 hrs</option>
                </select>
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button className="btn-primary" type="button">
                  Hashify
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="w-1/2">
          <img src="https://res.cloudinary.com/drg9hguhu/image/upload/v1603968756/flame-809_mg4shn.png" />
        </div>
      </div>
    </div>
  </>
);
