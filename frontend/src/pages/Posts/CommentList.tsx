import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Comment from "./Comment";

export type Comment = {
	id: number;
	title: string;
	body: string;
};

export default function CommentList() {
	const [comments, setComments] = useState<Comment[]>([]);

	useEffect(() => {
		axios({
			method: "get",
			url: "/comments",
			headers: {
				Authorization: "Bearer " + sessionStorage.getItem("token"),
			},
		}).then((res: AxiosResponse) => {
			setComments(res.data);
		});
	}, []);

	return (
		<>
			{comments ? (
				comments.map((comment) => <Comment comment={comment} />)
			) : (
				<div>Loading comments</div>
			)}
		</>
	);
}
