import "./styles.css";

export default function App() {
	return <>
		
		<header>
			<a href="https://litsey24.ru/index" id="icon-container">
				<img height="80" src="logo.png" id="icon"></img>
			</a>
			<a id="news">Новости</a>
			<div id="datetime">
				<div id="date">
					<a id="day">20</a>
					<span className="dot">.</span>
					<a id="month">08</a>
					<span className="dot">.</span>
					<a id="year">1993</a>
				</div>
				<div id="time">
					<a id="hour">12</a>
					<span className="colon">:</span>
					<a id="minute">00</a>
				</div>
			</div>
		</header>
		<main>
			<div className="frame" id="class-select">
				<select id="class-selector">
					<option value="5А">5А</option>
					<option value="5Б">5Б</option>
					<option value="6А">6А</option>
					<option value="6Б">6Б</option>
					<option value="7А">7А</option>
					<option value="7Б">7Б</option>
					<option value="8А">8А</option>
					<option value="8Б">8Б</option>
					<option value="9А">9А</option>
					<option value="9Б">9Б</option>
					<option value="10А">10А</option>
					<option value="10Б">10Б</option>
					<option value="11А">11А</option>
				</select>
				<button id="load_button">Загрузить</button>
			</div>
			<div className="frame" id="schedule"></div>
		</main>
	</>
}