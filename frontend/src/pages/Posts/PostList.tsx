import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";

export type Post = {
	id: number;
	title: string;
	body: string;
	userId: number;
};

export default function PostList() {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		axios({
			method: "get",
			url: "/posts",
			headers: {
				Authorization: "Bearer " + sessionStorage.getItem("token"),
			},
		}).then((res: AxiosResponse) => {
			setPosts(res.data);
		});
	}, []);

	return (
		<>
			{posts ? (
				posts.map((post) => <Post post={post} />)
			) : (
				<div>Loading posts</div>
			)}
		</>
	);
}
