import "./styles.css";

export default function App() {
	return (
		<>
			<header>
				<img height="80" src="logo.png" id="icon"></img>
				<a id="news"></a>
			</header>
			<main>
				<div className="frame" id="container"></div>
				<div className="frame" id="upcoming"></div>
			</main>
		</>
	);
}