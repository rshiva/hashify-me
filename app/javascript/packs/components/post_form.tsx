import * as React from "react";
import { useState } from "react";

const PostForm: React.FC = () => {
    const [state, setState] = useState("");
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
                const post = JSON.parse(xhr.response.body)
                setState(post);
            } else {
                setState("ERROR");
            }
        };
        xhr.send(data);
    }

    return (
        <form className="max-w-sm" onSubmit={submitForm}>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                        Secret
                    </label>
                </div>
                <div className="md:w-2/3">
                    <textarea
                        name="body"
                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-middle-blue-green"
                        placeholder="Your secret"
                        cols={20}
                    />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                        Passcode <br/> ( optional )
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        type="text"
                        name="body"
                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-middle-blue-green"
                        placeholder="Your salt"
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
                    <select name="expired_at" className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-middle-blue-green">
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
    )
}

export default PostForm;