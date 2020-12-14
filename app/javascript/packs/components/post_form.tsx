import * as React from "react";
import { useState, useRef } from "react";

interface PostProps {
  body: string;
  salty_password?: string;
  expired_at: string;
  url_token?: string;
}

const PostForm: React.FC<PostProps> = (props: PostProps) => {
  const [post, setPost] = useState(props);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const form = useRef(null);

  function submitForm(ev) {
    ev.preventDefault();
    fetch("/v1/posts", {
      method: "POST",
      body: JSON.stringify({ post }),
    })
      .then(function(response) {
        setStatus('success')
        return response.json();
      })
      .then((data) => setPost(data.post))
      .catch((error) => setError(error));
  }

  return (
    <>
      {status !== "success" ?
        <form className="max-w-sm" ref={form} onSubmit={submitForm}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                Secret
                  </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                name="post[body]"
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-middle-blue-green"
                placeholder={props.body}
                cols={20}
                value={post.body}
                onChange={(ev) => setPost({ ...post, body: ev.target.value })}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                Passcode <br /> ( optional )
                  </label>
            </div>
            <div className="md:w-2/3">
              <input
                type="text"
                name="post[salty_password]"
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-middle-blue-green"
                placeholder="Your salt"
                value={post.salty_password}
                onChange={(ev) =>
                  setPost({ ...post, salty_password: ev.target.value })
                }
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
              <select
                name="post[expired_at]"
                value={post.expired_at}
                onChange={(ev) =>
                  setPost({ ...post, expired_at: ev.target.value })
                }
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-middle-blue-green"
              >
                <option value="2 hrs">2 hrs</option>
                <option value="12 hrs">12 hrs</option>
                <option value="24 hrs">24 hrs</option>
              </select>
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button className="btn-primary">Hashify</button>
            </div>
          </div>
        </form> :
        <p>Post: {post.url_token}</p>
      }
    </>
  );
};

export default PostForm;
