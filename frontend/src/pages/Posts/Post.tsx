import { Post as PostType } from "./PostList";
import { useNavigate } from "react-router-dom";

export default function Post({ post }: { post: PostType }) {
  const navigate = useNavigate();
  function directToPostPage() {
    navigate("/posts/" + post.id);
  }
  return (
    <div onClick={directToPostPage}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
