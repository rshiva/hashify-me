import * as React from "react";
import { useState, useRef } from "react";

interface PostProps {
  body: string;
  salty_password?: string;
  expired_at: string;
  url_token?: string;
  has_salt: boolean;
}

const PostForm: React.FC<PostProps> = (props) => {
  const [post, setPost] = useState(props);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [copyMessage, setMessage] = useState("");
  const form = useRef(null);
  const clipboard = useRef(null);

  const createPost = async (post: PostProps) => {
    var response = await fetch("/v1/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return await response.json();
    }
  }

  function submitForm(ev: React.FormEvent) {
    ev.preventDefault();
    createPost(post).then((response) => {
      setStatus('success');
      setPost(response.data);
      return response.data;
    }).catch(error => {
      setError(error);
      console.error(error);
    })
  }

  const copyToClipboard = () => {
    window.getSelection().removeAllRanges();
    const range = document.createRange();
    range.selectNode(clipboard.current);
    window.getSelection().addRange(range);

    try {
      const successful = document.execCommand('copy');
      const message = successful ? 'successful' : 'unsuccessful';
      setMessage('Copy url command was ' + message + ' You can now share this url.');
    } catch (err) {
      setMessage('Oops, unable to copy');
    }
    window.getSelection().removeAllRanges();
  };
  
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
                placeholder="Your message goes here "
                cols={20}
                value={post.body}
                onChange={(ev) => setPost({ ...post, body: ev.target.value })}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                Passcode <br /> ( Enable ) &nbsp;
                <input
                  name="post[has_salt]"
                  type="checkbox"
                  checked={post.has_salt}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                    setPost({ ...post, has_salt: ev.target.checked })
                  } />
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                type="text"
                name="post[salty_password]"
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-middle-blue-green"
                placeholder="Your salt"
                value={post.salty_password}
                disabled={!post.has_salt}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
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
        <div className="border border-black p-6">
          Shareable URL:
          <p ref={clipboard}>{`https://hashify.app/secret/${post.url_token}`}</p>
          <button onClick={copyToClipboard} className="btn-primary">Copy to Clipboard</button>
          {copyMessage !== "" && <p>{copyMessage}</p>}
        </div>
      }
    </>
  );
};

export default PostForm;
