import "./styles.css";
import "./res/s20241007_middle.json";
interface ScheduleData {
	[key: string]: {
		[day: string]: {
			name: string;
			classroom: number[];
			was: number[] | null;
		}[];
	};
}
function isNotNull(value: number[] | null): value is number[] {
	return value !== null;
}
var data: ScheduleData;
fetch("./res/s20241007_middle.json").then((response: Response) => {
	return response.text();
}).then((text: string) => {
	data = JSON.parse(text) as ScheduleData;
})

export function createScheduleElement(index: number, subject: string, classroom: number[], isReplacement: boolean): HTMLDivElement {
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
	r.innerHTML = classroom.join("/");
	c.appendChild(r);
	return p;
}
export function loaderButtonEvent(): void {
	const classSelector = document.getElementById("class-selector");
	const scheduleTab = document.getElementById("schedule");
	const loadButton = document.getElementById("load_button");

	while (!classSelector) {
		setTimeout(() => {}, 1000);
	}
	while (!scheduleTab) {
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
	const arr = data[selectedClass][dotw];
	for (var i = 1; i < arr.length; i++) {
		scheduleTab.appendChild(createScheduleElement(i, arr[i].name, arr[i].classroom, isNotNull(arr[i].was)));
	}
}

export function showcaseMode(): void {
	var randomNum: number = 5 + Math.floor(Math.random() * 3);
	for (var i = 0; i < randomNum; i++) {
		var clz: string = "";
		clz = clz.concat(Math.floor(Math.random() * 3).toString());
		clz = clz.concat((Math.floor(Math.random() * 10).toString()).padStart(2, '0'));
		var randomWas: boolean = Math.floor(Math.random() * 2) == 1;
		createScheduleElement(i+1, "Предмет", [Number(clz)] as number[], randomWas);
	}
}