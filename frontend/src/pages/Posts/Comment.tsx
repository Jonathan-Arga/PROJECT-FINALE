import { Comment as CommentType } from "./CommentList";

export default function Comment({ comment }: { comment: CommentType }) {
	return (
		<div>
			<h3>{comment.title}</h3>
			<p>{comment.body}</p>
		</div>
	);
}
