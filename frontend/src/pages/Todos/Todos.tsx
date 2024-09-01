import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { getAuthHeader } from "../../constants";
import Todo from "./Todo";

export interface TodoType {
	id: number;
	title: string;
	completed: boolean;
	userId: number;
}

export default function Todos() {
	const [todos, setTodos] = useState<TodoType[]>([]);
	const [loading, setLoading] = useState(false);
	const fetchTodos = useCallback(async () => {
		setLoading(true);
		const res = await axios.get("/api/todos", {
			headers: getAuthHeader(),
		});
		setTodos(res.data);
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);

	return (
		<div>
			<h1>Todos</h1>
			{loading ? (
				todos.map((todo) => (
					<Todo key={todo.id} todo={todo} onChange={fetchTodos} />
				))
			) : (
				<div>Loading todos</div>
			)}
		</div>
	);
}
