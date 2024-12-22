import "./res/20241007.json";
const response = await fetch("20241007.json");
const data = JSON.parse(await response.text());
function createScheduleElement(index: number, subject: string, classroom: number): HTMLDivElement {
	var p = document.createElement("div");
	p.setAttribute("style", "align-items: center; display-inline: flex;");
	var n = document.createElement("p");
	n.setAttribute("style", "margin: 5px 13px 5px 5px; font-size: xxx-large; font-weight: bold;");
	n.innerHTML = index.toString();
	p.appendChild(n);
	var c = document.createElement("div");
	var s = document.createElement("p");
	s.setAttribute("style", "margin: 0px 0px 2px 0px;");
	s.innerHTML = subject;
	c.appendChild(s);
	var r = document.createElement("p");
	r.setAttribute("style", "margin: 2px 0px 0px 0px;");
	r.innerHTML = classroom.toString();
	c.appendChild(r);
	return p;
}
function loaderButtonEvent(): void {
	window.onload = () => {
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
		
		var selectedClass = null;
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
			schedule.appendChild(createScheduleElement(i, arr.name, arr.classroom));
		}
		loadButton.onclick = loaderButtonEvent;
	}
}