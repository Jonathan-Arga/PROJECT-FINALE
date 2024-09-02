import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Comment from "./Comment";
import { getAuthHeader } from "../../constants";

export type Comment = {
  id: number;
  title: string;
  body: string;
  user: boolean;
};

interface CommentListProps {
  postid: number;
}

export default function CommentList(props: CommentListProps) {
  const { postid } = props;

  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const TitleRef = useRef<HTMLInputElement>(null);
  const BodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const getComments = async () => {
      setIsLoading(true);
      const res = await axios({
        method: "get",
        url: "/api/comments/" + postid,
        headers: getAuthHeader(),
      });
      console.log(res.data);
      setIsLoading(false);
      if (res.data.length === 0) return;
      setComments(res.data);
    };
    getComments();
  }, [postid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!TitleRef.current?.value || !BodyRef.current?.value)
      return alert("Please fill in all fields");

    const res = await axios.post(
      "/api/comments",
      {
        title: TitleRef.current?.value,
        body: BodyRef.current?.value,
        postid,
      },
      { headers: getAuthHeader() }
    );

    if (res.status != 201) return alert(res.data.message);
    setComments((prevComments) =>
      prevComments.length > 0 ? [...prevComments, res.data] : [res.data]
    );

    TitleRef.current!.value = "";
    BodyRef.current!.value = "";
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Comments</h1>
        <input type="text" placeholder="Title" ref={TitleRef} />
        <textarea placeholder="Body" ref={BodyRef}></textarea>
        <button>New Comment</button>
      </form>
      {comments.length > 0
        ? comments.reverse().map((comment) => <Comment comment={comment} />)
        : isLoading && <div>Loading comments</div>}
    </>
  );
}
