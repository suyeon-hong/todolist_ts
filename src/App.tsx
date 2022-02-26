import { ChangeEvent, useState, useRef, useEffect } from "react";
import "./App.css";
import { IInput, IList } from "interface";
import Todo from "components/Todo";

const TODOS = "todos";

const App = () => {
	const nextId = useRef(1);
	const [input, setInput] = useState<IInput>({
		task: "",
		deadline: "",
	});
	const [todoList, setTodoList] = useState<IList[]>([]);

	const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setInput((input) => ({ ...input, [e.target.name]: e.target.value }));
	};

	const addTodo = (): void => {
		if (input.task === "" || input.deadline === "") return;
		setTodoList((list) => [...list, { id: nextId.current, ...input }]);
		setInput(() => ({
			task: "",
			deadline: "",
		}));
		nextId.current += 1;
	};

	const removeTodo = (id: number): void => {
		setTodoList((list) => list.filter((li) => li.id !== id));
	};

	useEffect(() => {
		const savedList = localStorage.getItem(TODOS);

		if (typeof savedList === "string") {
			const parsedList = JSON.parse(savedList);
			setTodoList(parsedList);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(TODOS, JSON.stringify(todoList));
	}, [todoList]);

	return (
		<div className="todoContainer">
			<div className="userInput">
				<div>
					<input
						type="text"
						name="task"
						value={input.task}
						onChange={onChange}
						placeholder="할 일을 입력하세요"
					/>
					<input
						type="number"
						name="deadline"
						value={input.deadline}
						onChange={onChange}
						placeholder="마감기한을 입력하세요"
					/>
				</div>
				<button onClick={addTodo}>등록</button>
			</div>
			<div className="todolistContainer">
				{todoList.map((list: IList) => (
					<Todo list={list} key={list.id} removeTodo={removeTodo} />
				))}
			</div>
		</div>
	);
};

export default App;
