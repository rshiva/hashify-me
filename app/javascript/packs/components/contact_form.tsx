import * as React from "react";
import { useState } from "react";

const ContactForm: React.FC = () => {
    const [status, setStatus] = useState("");
    function submitForm(ev) {
        ev.preventDefault();
        const form = ev.target;
        const data = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                form.reset();
                setStatus("SUCCESS");
            } else {
                setStatus("ERROR");
            }
        };
        xhr.send(data);
    }
    return (
        <>
            <form
                className="max-w-sm"
                onSubmit={submitForm}
                action="https://formspree.io/f/xknpzyzr"
                method="POST"
            >
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Email
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            type="email"
                            name="email"
                            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-middle-blue-green"
                            placeholder="Email"
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Message
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <textarea
                            name="message"
                            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-middle-blue-green"
                            placeholder="Your message"
                            cols={60}
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        {status === "SUCCESS" ? 
                            <p>Thanks for Your message! we will get back to you as soon as we can.</p> :
                            <button className="btn-primary">
                                Send
                            </button>
                        }
                        {status === "ERROR" && <p>Ooops! There was an error.</p>}
                    </div>
                </div>
            </form>
        </>
    );
};

export default ContactForm;