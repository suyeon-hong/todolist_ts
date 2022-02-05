import { ChangeEvent, FormEvent, useRef, useState } from "react";
import "./App.css";
import { IInput, IList } from "./interface";

function App() {
	const nextId = useRef(1);
	const [userInput, setUserInput] = useState<IInput>({
		task: "",
		deadline: "",
	});
	const [todolist, setTodolist] = useState<IList[]>([]);
	const { task, deadline } = userInput;

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setUserInput((input) => ({ ...input, [name]: value }));
	};

	const addTodo = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (task === "" || deadline === "") return;
		setTodolist((todolist) =>
			todolist.concat([{ id: nextId.current, ...userInput }])
		);
		setUserInput({
			task: "",
			deadline: "",
		});
		nextId.current++;
		console.log(todolist);
	};

	return (
		<div className="wrapper">
			<form className="userInput" onSubmit={addTodo}>
				<div>
					<input
						type="text"
						name="task"
						value={task}
						onChange={handleChange}
						placeholder="할 일을 입력하세요"
					/>
					<input
						type="number"
						name="deadline"
						value={deadline}
						onChange={handleChange}
						placeholder="마감기한을 입력하세요"
					/>
				</div>
				<button>등록</button>
			</form>
			<ul className="todolistContainer">
				<li>
					<span>할 일</span>
					<span>1일 남음</span>
					<button>X</button>
				</li>
			</ul>
		</div>
	);
}

export default App;
