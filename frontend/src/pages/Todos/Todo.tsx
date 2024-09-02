import { useRef, useState } from "react";

import { TodoType } from "./Todos";
import axios from "axios";
import { getAuthHeader } from "../../constants";

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
    const newTodo = { ...todo, checked: e.target.checked };
    const res = await axios.patch(`/api/todos/${newTodo.id}`, newTodo, {
      headers: getAuthHeader(),
    });
    if (res.status != 200) return alert(res.data.message);
    onChange();
  };
  const handleTitleChange = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsChangingTitle(false);
    const newTodo = { ...todo, name: titleRef.current?.value };
    const res = await axios.patch(`/api/todos/${newTodo.id}`, newTodo, {
      headers: getAuthHeader(),
    });
    if (res.status != 200) return alert(res.data.message);
    onChange();
  };

  const handleChangeButtonClick = () => {
    setIsChangingTitle(true);
    console.log(todo.name);
  };

  const handleDelete = async () => {
    await axios.delete("/api/todos/" + todo.id, {
      headers: getAuthHeader(),
    });
    window.location.reload();
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.checked}
        onChange={handleCompletedCheckboxChange}
      />
      <input
        disabled={!isChangingTitle}
        defaultValue={todo.name}
        ref={titleRef}
      />

      {isChangingTitle ? (
        <>
          <button onClick={handleTitleChange}>&#10003;</button>
          <button
            onClick={() => {
              titleRef.current!.value = todo.name;
              setIsChangingTitle(false);
            }}
          >
            &#120;
          </button>
        </>
      ) : (
        <>
          <button onClick={handleChangeButtonClick}>&#9998;</button>
          <button onClick={handleDelete}>&#128465;</button>
        </>
      )}
    </div>
  );
}
