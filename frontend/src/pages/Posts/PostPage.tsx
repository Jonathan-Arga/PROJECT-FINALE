import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthHeader } from "../../constants";
import { Post } from "./PostList";
import CommentList from "./CommentList";

export default function PostPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [editingPost, setEditingPost] = useState<boolean>(false);
  const [postTitle, setPostTitle] = useState<string>("");
  const [postBody, setPostBody] = useState<string>("");
  const navigate = useNavigate();

  const editToggle = () => {
    setEditingPost((prev) => !prev);
    setPostTitle(post!.title);
    setPostBody(post!.body);
  };
  const updatePost = async () => {
    await axios.patch(
      "/api/posts/" + post!.id,
      {
        title: postTitle,
        body: postBody,
      },
      { headers: getAuthHeader() }
    );
    window.location.reload();
    setEditingPost(false);
  };
  const deletePost = () => {
    axios.delete("/api/posts/" + post!.id, { headers: getAuthHeader() });
    alert("postDeleted");
    navigate("/posts");
  };

  useEffect(() => {
    const getStuff = async () => {
      const res = await axios.get("/api/posts/" + params.postid, {
        headers: getAuthHeader(),
      });
      setPost(res.data);
      setPostTitle(res.data.title);
      setPostBody(res.data.body);
    };
    getStuff();
  }, [params.postid]);

  return (
    <>
      {post ? (
        <>
          <div>
            {editingPost ? (
              <>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
                <textarea
                  value={postBody}
                  onChange={(e) => setPostBody(e.target.value)}
                ></textarea>
                <button onClick={updatePost}>Update</button>
                <button onClick={editToggle}>Cancel</button>
              </>
            ) : (
              <>
                <h1>{postTitle}</h1>
                <p>{postBody}</p>
                {post.user && (
                  <>
                    <button onClick={editToggle}>Edit</button>
                    <button onClick={deletePost}>Delete</button>
                  </>
                )}
              </>
            )}
          </div>
          <div>
            <CommentList postid={post.id} />
          </div>
        </>
      ) : (
        <div>
          <h1>LOADING POST</h1>
        </div>
      )}
    </>
  );
}
