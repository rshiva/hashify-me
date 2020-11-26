import * as React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const imgUrl =
  "https://res.cloudinary.com/drg9hguhu/image/upload/v1603795471/flame-1250_iccnjo.png";

export const Home: React.FC = () => (
  <>
    <Header img={imgUrl} />
    <h1 className="text-4xl text-center my-4 font-heading">
      It's really easy to slip up!
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

    <div className="font-body font-normal text-xl container mx-auto lg:px-16 md:px-8 sm:px-8 my-8">
      <div className="flex flex-wrap -my-8 -mx-1 lg:-mx-2 sm:w-100">
        <div className="w-1/2 px-4">
          <div className="md:flex md:items-center mb-6">
            <a href="https://slack.com/oauth/v2/authorize?client_id=1457351754660.1444473716470&scope=chat:write,commands&user_scope=">
              <img
                alt="Add to Slack"
                height="40"
                width="139"
                src="https://platform.slack-edge.com/img/add_to_slack.png"
                srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
              />
            </a>
          </div>
          <div className="md:flex md:items-center mb-6">
            <p>
              Instantly start sharing on slack with a simple step. Just add our
              app to your slack account, type the command below and let our bot
              guide you through the process of generating a unique link for
              sharing your secrets.
            </p>
          </div>
          <div className="md:flex md:items-center mb-6">
            <SyntaxHighlighter language="shell" style={docco}>
              /hashify
            </SyntaxHighlighter>
          </div>
        </div>
        <div className="w-1/2 px-4">
          <div className="md:flex md:items-center mb-6">
            <img src="https://res.cloudinary.com/drg9hguhu/image/upload/v1604917421/hashify-screenshot_pkxx3v.png" />
          </div>
        </div>
      </div>
    </div>

    <div className="font-body font-normal text-xl container mx-auto lg:px-16 md:px-8 sm:px-8 my-8">
      <div className="flex flex-wrap -my-8 -mx-1 lg:-mx-2 sm:w-100">
        <div className="w-1/2 px-4">
          <div className="md:flex md:items-center mb-6">
            <img src="https://res.cloudinary.com/drg9hguhu/image/upload/v1604917775/discord-screenshot_qld5ww.png" />
          </div>
        </div>
        <div className="w-1/2 px-4">
          <div className="md:flex md:items-center mb-6">
            <img
              className="max-h-sm"
              alt="Add to Discord"
              height="40"
              width="139"
              src="https://res.cloudinary.com/drg9hguhu/image/upload/v1604224578/Discord-Logo_Wordmark-Color_noetmj.svg"
            />
          </div>
          <div className="md:flex md:items-center mb-6">
            <p>
              If you use discord, you can use our discord bot directly. using
              the command below. The format is divided into - 1. The message, 2.
              an optional passcode, 3. Time in hours with 3 options of 2/12/24.
              We recommend the time to be as less as possible.
            </p>
          </div>
          <div className="md:flex md:items-center mb-6">
            <SyntaxHighlighter language="shell" style={docco}>
              /hashify -m Message goes here -s optional salt key -e 2/12/24
              hours
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>

    <div id="hashify" className="font-body font-normal text-xl container mx-auto lg:px-16 md:px-8 sm:px-8 my-8">
      <div className="flex flex-wrap -my-8 -mx-1 lg:-mx-2 sm:w-100">
        <div className="w-1/2 px-4 flex items-center justify-center">
          <form className="max-w-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Secret
                </label>
              </div>
              <div className="md:w-2/3">
                <textarea
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-middle-blue-green"
                  placeholder="Your secret"
                  cols={20}
                />
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
        <div className="w-1/2 px-4">
          <img src="https://res.cloudinary.com/drg9hguhu/image/upload/v1603968756/flame-809_mg4shn.png" />
        </div>
      </div>
    </div>
    <Footer />
  </>
);
