import _ from "lodash";

import { ChangeEvent, useState, useRef, useEffect, FormEvent } from "react";
import "./App.css";
import { List } from "interface";
import Todo from "components/Todo";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from "date-fns";
import ko from "date-fns/locale/ko";

const TODOS = "todos";

const App = () => {
	const nextId = useRef(0);
	const [input, setInput] = useState<string>("");
	const [todoList, setTodoList] = useState<IList[]>([]);
	const [deadline, setDeadline] = useState<Date | null>(new Date());

	registerLocale("ko", ko);
	const years = _.range(1990, getYear(new Date()) + 1, 1);
	const months = [
		"1월",
		"2월",
		"3월",
		"4월",
		"5월",
		"6월",
		"7월",
		"8월",
		"9월",
		"10월",
		"11월",
		"12월",
	];

	const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setInput(() => e.target.value);
	};

	const addTodo = () => {
		if (input === "") return;
		const Month = deadline!.getMonth() + 1;
		const Date = deadline?.getDate();

		setTodoList((list) => [
			...list,
			{
				id: nextId.current,
				task: input,
				deadline: `${Month}월 ${Date}일 까지`,
			},
		]);
		setInput(() => "");
		nextId.current += 1;
	};

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addTodo();
	};

	const removeTodo = (id: number): void => {
		setTodoList((list) => list.filter((li) => li.id !== id));
	};

	useEffect(() => {
		const savedList = localStorage.getItem(TODOS);

		if (typeof savedList === "string") {
			const parsedList = JSON.parse(savedList);
			setTodoList(parsedList);
			nextId.current = parsedList.length;
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(TODOS, JSON.stringify(todoList));
	}, [todoList]);

	return (
		<div className="todoContainer">
			<form className="userInput" onSubmit={submitHandler}>
				<div>
					<input
						type="text"
						name="task"
						value={input}
						onChange={onChange}
						placeholder="할 일을 입력하세요"
					/>
					<DatePicker
						renderCustomHeader={({
							date,
							changeYear,
							changeMonth,
							decreaseMonth,
							increaseMonth,
							prevMonthButtonDisabled,
							nextMonthButtonDisabled,
						}) => (
							<div
								style={{
									margin: 10,
									display: "flex",
									justifyContent: "center",
								}}
							>
								<button
									onClick={decreaseMonth}
									disabled={prevMonthButtonDisabled}
								>
									{"<"}
								</button>
								<select
									value={getYear(date)}
									onChange={({ target: { value } }) => changeYear(+value)}
								>
									{years.map((option: number) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>

								<select
									value={months[getMonth(date)]}
									onChange={({ target: { value } }) =>
										changeMonth(months.indexOf(value))
									}
								>
									{months.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>

								<button
									onClick={increaseMonth}
									disabled={nextMonthButtonDisabled}
								>
									{">"}
								</button>
							</div>
						)}
						selected={deadline}
						dateFormat={"yyyy-MM-dd"}
						locale={ko}
						onChange={(date) => setDeadline(date)}
					/>
				</div>
				<button className="addBtn" onClick={addTodo}>
					등록
				</button>
			</form>
			<div className="todolistContainer">
				{todoList.map((list: List) => (
					<Todo list={list} key={list.id} removeTodo={removeTodo} />
				))}
			</div>
		</div>
	);
};

export default App;
