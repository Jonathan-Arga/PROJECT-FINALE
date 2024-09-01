import { useRef, useState } from "react";

import { TodoType } from "./Todos";
import axios from "axios";

interface todoProps {
	todo: TodoType;
	onChange: () => void;
}

export default function Todo(props: todoProps) {
	const { todo, onChange } = props;
	const [isChangingTitle, setIsChangingTitle] = useState<boolean>(false);
	const titleRef = useRef<HTMLInputElement>(null);

	const handleCompletedCheckboxChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		e.preventDefault();
		const newTodo = { ...todo, completed: e.target.checked };
		const res = await axios.patch(`/todos/${newTodo.id}`, newTodo);
		if (res.status != 200) return alert(res.data.message);
		onChange();
	};
	const handleTitleChange = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		setIsChangingTitle(false);
		const newTodo = { ...todo, title: titleRef.current?.value };
		const res = await axios.patch(`/todos/${newTodo.id}`, newTodo);
		if (res.status != 200) return alert(res.data.message);
		onChange();
	};

	return (
		<div>
			<input
				onDoubleClick={() => setIsChangingTitle(true)}
				disabled={isChangingTitle}
				defaultValue={todo.title}
				ref={titleRef}
			/>

			{isChangingTitle && (
				<>
					<button onClick={handleTitleChange}>&#10003;</button>
					<button
						onClick={() => {
							titleRef.current!.value = todo.title;
							setIsChangingTitle(false);
						}}
					>
						&#120;
					</button>
				</>
			)}

			<input
				type="checkbox"
				checked={todo.completed}
				onChange={handleCompletedCheckboxChange}
			/>
		</div>
	);
}
