import React from "react";
import { IList } from "../interface";

interface Props {
	list: IList;
	removeTodo(id: number): void;
}

const Todo = ({ list, removeTodo }: Props) => {
	return (
		<li>
			<span>{list.task}</span>
			<span>{list.deadline}일 남음</span>
			<button onClick={() => removeTodo(list.id)}>X</button>
		</li>
	);
};

export default React.memo(Todo);
