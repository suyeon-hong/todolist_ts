import "./App.css";

function App() {
	return (
		<div className="wrapper">
			<form className="userInput">
				<div>
					<input type="text" placeholder="할 일을 입력하세요" />
					<input type="number" placeholder="마감기한을 입력하세요" />
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
