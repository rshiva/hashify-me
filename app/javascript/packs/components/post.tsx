import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";

interface PostProps {
    id: string;
    body: string;
    salty_password?: string;
    has_salt: boolean;
    expired_at: string;
    url_token?: string;
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
        throw new Error(`HTTP error! status: ${response.status}`);
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

export const Post: React.FC<PostProps> = (props) => {
    const { slug } = useParams();
    const [reveal, setReveal] = useState("");
    const [error, setError] = useState("");
    const [post, setPost] = useState(props);
       
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
            return getReveal.data;
        }
        catch (error) {
            setError(error.message);
        }
    };

    const handleReveal = (ev: React.FormEvent) => {
    }

    return (
        <>
            <Header page="secret" title="That's our secret!" />
            <h1 className="text-4xl text-center my-4 font-heading">
                Did someone you know give you this link ?
            </h1>
            <div id="secret" className="font-body font-normal text-xl container mx-auto lg:px-16 md:px-8 sm:px-8 my-8">
                <div className="flex flex-wrap sm:w-100">
                    <div className="w-full px-4 flex items-center justify-center">
                        {error !== "" ?
                            <div>{error}</div>
                            :
                            <>
                                {post.has_salt === true ?
                                    <>
                                        <form className="max-w-sm" ref={revealForm} onSubmit={handleReveal}>
                                            <div className="md:flex md:items-center mb-6">
                                                <div className="md:w-1/3">
                                                <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                    Salt
                                                </label>
                                                </div>
                                                <div className="md:w-2/3">
                                                <textarea
                                                    name="post[salty_]"
                                                    className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-middle-blue-green"
                                                    placeholder="Your salt"
                                                    cols={20}
                                                    value={post.body}
                                                    onChange={(ev) => setPost({ ...post, body: ev.target.value })}
                                                />
                                                </div>
                                            </div>
                                        </form>
                                    </> :
                                    <button onClick={async () => { revealPost(slug) }} className="btn-primary">Reveal</button>
                                }
                            </>
                        }
                    </div>
                    {reveal !== "" ?
                        <div className="w-full px-4 flex items-center justify-center">
                            <div className="border border-black p-6">
                                {reveal}
                            </div>
                        </div>
                        :
                        <div>{error}</div>

                    }
                </div>
            </div>
            <Footer />
        </>
    );
};