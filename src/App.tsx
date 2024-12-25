import "./styles.css";
import "./res/20241007-middle.json";
let data: any;
fetch("./res/20241007-middle.json")
  	.then((res) => res.json())
  	.then((data_from_file) => {
    	data = data_from_file;
  	})
  	.catch(err => {
  		console.error("Ошибка загрузки JSON:", err);
  	});
export function createScheduleElement(index: number, subject: string, classroom: number, isReplacement: boolean): HTMLDivElement {
	var p = document.createElement("div");
	p.setAttribute("style", "align-items: center; display-inline: flex;".concat(isReplacement ? " color: red;" : ""));
	var n = document.createElement("p");
	n.setAttribute("style", "margin: 5px 13px 5px 5px; font-size: xxx-large; font-weight: bold;".concat(isReplacement ? " color: red;" : ""));
	n.innerHTML = index.toString();
	p.appendChild(n);
	var c = document.createElement("div");
	var s = document.createElement("p");
	s.setAttribute("style", "margin: 0px 0px 2px 0px;".concat(isReplacement ? " color: red;" : ""));
	s.innerHTML = subject;
	c.appendChild(s);
	var r = document.createElement("p");
	r.setAttribute("style", "margin: 2px 0px 0px 0px;".concat(isReplacement ? " color: red;" : ""));
	r.innerHTML = classroom.toString();
	c.appendChild(r);
	return p;
}
export function loaderButtonEvent(): void {
	const classSelector = document.getElementById("class-selector");
	const schedule = document.getElementById("schedule");
	const loadButton = document.getElementById("load_button");

	while (!classSelector) {
		setTimeout(() => {}, 1000);
	}
	while (!schedule) {
		setTimeout(() => {}, 1000);
	}
	while (!loadButton) {
		setTimeout(() => {}, 1000);
	}

	var selectedClass: string = "";
	classSelector.addEventListener("change", (event) => {
		if (event.target) {
			selectedClass = (event.target as HTMLOptionElement).value;
		}
	});
	while (!selectedClass) {
		setTimeout(() => {}, 1000);
	}
	let dotw: string = "";
	switch (new Date().getDay()) {
		case 1:
			dotw = "monday";
			break;
		case 2:
			dotw = "tuesday";
			break;
		case 3:
			dotw = "wednesday";
			break;
		case 4:
			dotw = "thursday";
			break;
		case 5:
			dotw = "friday";
			break;
		case 6:
			dotw = "saturday";
			break;
		default:
			dotw = "sunday";
			break;
	}
	if (dotw == "sunday") return;
	const arr = data.classes[selectedClass][dotw];
	for (var i = 1; i < arr.length; i++) {
		schedule.appendChild(createScheduleElement(i, arr.name, arr.classroom, arr.was == null));
	}
}

export function showcaseMode(): void {
	var randomNum: number = 5 + Math.floor(Math.random() * 3);
	for (var i = 0; i < randomNum; i++) {
		var clz: string = "";
		clz = clz.concat(Math.floor(Math.random() * 3).toString());
		clz = clz.concat((Math.floor(Math.random() * 10).toString()).padStart(2, '0'));
		var clzr: number = Number(clz);
		var randomWas: boolean = Math.floor(Math.random() * 2) == 1;
		createScheduleElement(i+1, "Предмет", clzr, randomWas);
	}
}

window.onload = () => {
	const loadButton = document.getElementById("load_button");
	if (loadButton) {
		loadButton.onclick = loaderButtonEvent;
	}
}



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
					<option value="_5A">5А</option>
					<option value="_5B">5Б</option>
					<option value="_6A">6А</option>
					<option value="_6B">6Б</option>
					<option value="_7A">7А</option>
					<option value="_7B">7Б</option>
					<option value="_8A">8А</option>
					<option value="_8B">8Б</option>
					<option value="_9A">9А</option>
					<option value="_9B">9Б</option>
					<option value="_10A">10А</option>
					<option value="_10B">10Б</option>
					<option value="_11A">11</option>
				</select>
				<input type="button" value="Загрузить" onClick={loaderButtonEvent} />
			</div>
			<div className="frame" id="schedule"></div>
		</main>
	</>
}