import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";
import { trackEvent } from '../analytics';

interface PostProps {
    body: string;
    salty_password?: string;
    has_salt: boolean;
    expired_at: string;
    url_token: string;
}

interface RevealProps {
    data: string;
}

const fetchPost = async (slug: string): Promise<PostProps> => {
    var response = await fetch(`/v1/secret?token=${slug}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    if (!response.ok) {
        throw new Error(`Message does not exist or already viewed: ${response.status}`);
    } else {
        return await response.json();
    }
}

const fetchReveal = async (id: string): Promise<RevealProps> => {
    var response = await fetch(`/v1/posts/${id}/reveal`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        return await response.json();
    }
}

const revealWithSalt = async (id: string, salty_password: string): Promise<RevealProps> => {
    var response = await fetch(`/v1/posts/${id}/reveal_post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ salty_password }),
    });
    if (!response.ok) {
        console.log("response", response.status)
    } else {
        return await response.json();
    }
}

export const Post: React.FC<PostProps> = (props) => {
    const { slug } = useParams();
    const [reveal, setReveal] = useState("");
    const [error, setError] = useState("");
    const [post, setPost] = useState(props);
    const [alert, setAlert] = useState("invisible sm:invisible")
    const [apiResponse, setApiResponse] = useState("");

    const revealForm = useRef(null);

    useEffect(() => {
        (async function fetchCurrentPost() {
            try {
                const getPost = await fetchPost(slug);
                setPost(getPost);
            }
            catch (error) {
                setError(error.message);
            }
        })();
    }, []);

    const revealPost = async (slug: string): Promise<string> => {
        try {
            const getReveal = await fetchReveal(slug);
            setReveal(getReveal.data);
            trackEvent("Secret revealed - Success - NoPasscode");
            return getReveal.data;
        }
        catch (error) {
            setError(error.message);
        }
    };

    async function handleReveal(ev: React.FormEvent) {
        ev.preventDefault();
        const getReveal = await revealWithSalt(slug, post.salty_password);
        if (getReveal) {
            trackEvent("Secret revealed - Success - Passcode");
            setAlert("invisible sm:invisible  md:invisible")
            setReveal(getReveal.data);
        } else {
            setAlert("visible sm:visible  md:visible text-center w-1/2 sm:w-full md:w-full m-0 m-auto sm:py-4 md:py-4")
            setApiResponse("Invalid Passcode")
        }

    }

    return (
        <>
            <Header page="secret" title="That's our secret!" />
            <h1 className="text-4xl text-center my-4 font-heading">
                Did someone you know give you this link ?
            </h1>
            <div role="alert" className={alert}>
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Alert
                </div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>{apiResponse}</p>
                </div>
            </div>
            <div id="secret" className="font-body font-normal text-xl container mx-auto lg:px-16 md:px-8 sm:px-8 my-8">
                <div className="flex flex-wrap sm:w-100">
                    {reveal === "" &&
                        <div className="w-full px-4 flex items-center justify-center">
                            {error !== "" ?
                                <div>{error}</div>
                                :
                                <>
                                    {post.has_salt === true ?
                                        <form className="max-w-sm" ref={revealForm} onSubmit={handleReveal}>
                                            <div className="md:flex md:items-center mb-6">
                                                <div className="md:w-1/3">
                                                    <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                        Enter your passcode:
                                            </label>
                                                </div>
                                                <div className="md:w-2/3">
                                                    <input
                                                        type="password"
                                                        name="post[salty_password]"
                                                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-middle-blue-green"
                                                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                                                            setPost({ ...post, salty_password: ev.target.value })
                                                        }
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <button className="btn-primary">Reveal</button>
                                        </form> :
                                        <button onClick={async () => { revealPost(slug) }} className="btn-primary">Reveal</button>
                                    }
                                </>
                            }
                        </div>
                    }
                    {reveal !== "" &&
                        <div className="w-full px-4 flex items-center justify-center animated-reveal">
                            <div className="border-2 border-black p-6 rounded-lg">
                                {reveal}
                            </div>
                        </div>
                    }
                </div>
            </div>
            <Footer />
        </>
    );
};