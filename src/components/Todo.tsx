import React from "react";
import { List } from "../interface";

interface Props {
	list: List;
	removeTodo(id: number): void;
}

const Todo = ({ list, removeTodo }: Props) => {
	return (
		<li>
			<span>{list.task}</span>
			<span>{list.deadline}</span>
			<button className="deleteBtn" onClick={() => removeTodo(list.id)}>
				X
			</button>
		</li>
	);
};

export default React.memo(Todo);
