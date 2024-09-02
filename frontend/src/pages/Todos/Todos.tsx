import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { getAuthHeader } from "../../constants";
import Todo from "./Todo";

export interface TodoType {
  id: number;
  name: string;
  checked: boolean;
  userId: number;
}

export default function Todos() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState<boolean>();

  const [title, setTitle] = useState<string>("");

  const makeTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(
      "/api/todos",
      { name: title },
      { headers: getAuthHeader() }
    );
    window.location.reload();
    setNewTodo(false);
  };

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
      {newTodo ? (
        <form onSubmit={makeTodo}>
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={makeTodo}>Submit</button>
        </form>
      ) : (
        <button onClick={() => setNewTodo(true)}>+</button>
      )}
      {loading ? (
        <div>Loading todos</div>
      ) : (
        todos.map((todo) => (
          <Todo key={todo.id} todo={todo} onChange={fetchTodos} />
        ))
      )}
    </div>
  );
}
