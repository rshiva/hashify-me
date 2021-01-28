import * as React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import PostForm from "./post_form";
import { Freelancer } from "./icons/freelancer";
import { ChatBot } from "./icons/chat_bot";

export const Home: React.FC = () => (
  <>
    <Header page="home" title="Share your secrets securely." />
    <div id="hashify" className="font-body font-normal text-xl container mx-auto lg:px-16 md:px-8 sm:px-8 my-8">
      <h1 className="text-4xl text-center my-4 font-heading">
        Start Sharing
      </h1>
      <div className="flex flex-wrap -my-8 -mx-1 lg:-mx-2 sm:w-100">
        <div className="w-1/2 sm:w-full px-4 flex items-center justify-center">
          <PostForm body="" expired_at="2 hrs" has_salt={false} salty_password={""} />
        </div>

        <div className="w-1/2 sm:w-full p-6 my-4">
          <div className="md:flex md:items-center mb-6">
            <ChatBot />
          </div>
        </div>
      </div>
    </div>

    <h1 className="text-4xl text-center my-4 font-heading">
      It's really easy to slip up!
    </h1>
    <div className="font-body font-normal text-xl container -my-6 mx-auto lg:px-16 md:px-8 sm:px-8 my-8">
      <div className="flex flex-wrap -my-8 -mx-1 lg:-mx-2 sm:w-100">
        <div className="w-1/2 sm:w-full p-6 my-4">
          <div className="md:flex md:items-center mb-6">
            <Freelancer />
          </div>
        </div>

        <div className="w-1/2 sm:w-full px-4 flex items-center justify-center">
          <p>
            It's really easy to share secrets on your favourite messenger.
            However, every time you do it, it lives in the database of
            those companies forever, exposing you to potential security
            risks. When you submit the form below or use one of our app / bot / browser extensions,
            we generate a link that self destructs after the specified time or as soon as it's viewed.
          </p>
        </div>
      </div>
    </div>

    <div className="font-body font-normal text-xl container mx-auto lg:px-16 md:px-8 sm:px-8 my-8 py-4">
      <div className="flex flex-wrap -my-8 -mx-1 lg:-mx-2 sm:w-100">
        <div className="w-1/2 sm:w-full px-4">
          <div className="md:flex md:items-center mb-6">
            <a href="https://slack.com/oauth/v2/authorize?client_id=1457351754660.1624709351138&scope=chat:write,commands&user_scope=">
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
        <div className="w-1/2 sm:w-full px-4">
          <div className="md:flex md:items-center mb-6">
            <img className="rounded-lg" src="https://res.cloudinary.com/drg9hguhu/image/upload/v1604917421/hashify-screenshot_pkxx3v.png" />
          </div>
        </div>
      </div>
    </div>

    <div className="font-body font-normal text-xl container mx-auto lg:px-16 md:px-8 sm:px-8 my-8 py-4">
      <div className="flex flex-wrap -my-8 -mx-1 lg:-mx-2 sm:w-100">
        <div className="w-1/2 sm:w-full px-4">
          <div className="md:flex md:items-center mb-6">
          <img
              className="rounded-lg h-auto"
              alt="Add to Discord"
              src="https://res.cloudinary.com/drg9hguhu/image/upload/v1604224578/Discord-Logo_Wordmark-Color_noetmj.svg"
            />
          </div>
        </div>
        <div className="w-1/2 sm:w-full px-4">
          <div className="md:flex md:items-center mb-6">
            <p>
              If you use discord, you can use our discord bot directly. using
              the command below. The format is divided into - <br/>
              1. The message <br/>
              2. An optional passcode <br/>
              3. Time in hours with 3 options of 2/12/24. <br/>
              We recommend the time to be as less as possible.
            </p>
          </div>
          <div className="md:flex md:items-center mb-6">
            <SyntaxHighlighter language="shell" style={docco}>
              {/* /hashify -m Message goes here -s optional salt key -e 2/12/24
              hours */}
              Coming Soon
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>

    <div className="font-body font-normal text-xl container mx-auto lg:px-16 md:px-8 sm:px-8 my-8 py-4">
      <div className="flex flex-wrap -my-8 -mx-1 lg:-mx-2 sm:w-100">
        <div className="w-1/2 sm:w-full px-4">
          <div className="md:flex md:items-center mb-6">
            <p>
              Share secrets from the comfort of your browser. We're working on
              creating a chrome extension that will easily become part of your
              daily workflow, so that you would never have to just paste a secret
              anywhere anymore.
            </p>
          </div>
          <div className="md:flex md:items-center mb-6">
            <SyntaxHighlighter language="shell" style={docco}>
              Coming Soon
            </SyntaxHighlighter>
          </div>
        </div>
        <div className="w-1/2 sm:w-full px-4">
          <div className="md:flex md:items-center mb-6">
            <img className="w-1/2" src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Chrome_icon_%28September_2014%29.svg" />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
);
