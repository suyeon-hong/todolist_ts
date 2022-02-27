import React from "react";
import { List } from "../interface";
import { TiDeleteOutline } from "react-icons/ti";

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
				<TiDeleteOutline />
			</button>
		</li>
	);
};

export default React.memo(Todo);
