import React, { useState } from "react";
import PostList from "./PostList";
import axios from "axios";
import { getAuthHeader } from "../../constants";

export default function Posts() {
  const [newPosting, setNewPosting] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const makePost = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(
      "/api/posts",
      { title, body },
      { headers: getAuthHeader() }
    );
    window.location.reload();
    setNewPosting(false);
  };
  return (
    <div>
      <h1>POSTS</h1>
      {newPosting ? (
        <form onSubmit={makePost}>
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="body"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <button onClick={makePost}>Submit</button>
        </form>
      ) : (
        <button onClick={() => setNewPosting(true)}>+</button>
      )}
      <PostList />
    </div>
  );
}
