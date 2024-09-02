import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";

export type Post = {
  id: number;
  title: string;
  body: string;
  userid: number;
};

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/posts",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    }).then((res: AxiosResponse) => {
      console.log(res.data);
      setPosts(res.data);
    });
  }, []);

  return (
    <>
      {posts?.length > 0 ? (
        posts.map((post) => <Post post={post} />)
      ) : (
        <div>Loading posts</div>
      )}
    </>
  );
}
