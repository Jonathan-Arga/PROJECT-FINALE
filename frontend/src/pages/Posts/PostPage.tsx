import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getAuthHeader } from "../../constants";
import { Post } from "./PostList";
import CommentList from "./CommentList";

export default function PostPage() {
	const params = useParams();
	const [post, setPost] = useState<Post | null>(null);

	axios
		.get("/posts/" + params.postid, {
			headers: getAuthHeader(),
		})
		.then((res: AxiosResponse) => setPost(res.data));

	return (
		<>
			{post ? (
				<>
					<div>
						<h1>{post.title}</h1>
						<p>{post.body}</p>
					</div>
					<div>
						<h2>COMMENTS</h2>
						<CommentList />
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
