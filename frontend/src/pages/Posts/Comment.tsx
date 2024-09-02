import { Comment as CommentType } from "./CommentList";
import { useState } from "react";
import { getAuthHeader } from "../../constants";
import axios from "axios";

export default function Comment({ comment }: { comment: CommentType }) {
  const [editingComment, setEditingComment] = useState<boolean>(false);
  const [commentTitle, setCommentTitle] = useState<string>(comment.title);
  const [commentBody, setCommentBody] = useState<string>(comment.body);

  const editToggle = () => {
    setEditingComment((prev) => !prev);
    setCommentTitle(comment!.title);
    setCommentBody(comment!.body);
  };
  const updateComment = async () => {
    await axios.patch(
      "/api/comments/" + comment!.id,
      {
        title: commentTitle,
        body: commentBody,
      },
      { headers: getAuthHeader() }
    );
    window.location.reload();
    setEditingComment(false);
  };
  const deleteComments = () => {
    axios.delete("/api/comments/" + comment!.id, { headers: getAuthHeader() });
    alert("comment Deleted");
    window.location.reload();
  };
  return (
    <div>
      {editingComment ? (
        <>
          <input
            type="text"
            value={commentTitle}
            onChange={(e) => setCommentTitle(e.target.value)}
          />
          <textarea
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
          ></textarea>
          <button onClick={updateComment}>Update</button>
          <button onClick={editToggle}>Cancel</button>
        </>
      ) : (
        <>
          <h1>{commentTitle}</h1>
          <p>{commentBody}</p>
          {comment.user && (
            <>
              <button onClick={editToggle}>Edit</button>
              <button onClick={deleteComments}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
