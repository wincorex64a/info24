import "./styles.css";

export default function App() {
	return (
		<>
			<header>
				<a href="https://litsey24.ru/index" id="icon-container">
					<img height="80" src="logo.png" id="icon"></img>
				</a>
				<a id="news">Новости</a>
			</header>
			<main>
				<div className="frame" id="container"></div>
				<div className="frame" id="upcoming"></div>
			</main>
		</>
	);
}
