import "./res/20241007.json";
const response = await fetch("20241007.json");
const data = JSON.parse(await response.text());
function createScheduleElement(index, subject, classroom) {
	var p = document.createElement("div");
	p.style = "align-items: center; display-inline: flex;";
	var n = document.createElement("p");
	n.style = "margin: 5px 13px 5px 5px; font-size: xxx-large; font-weight: bold;";
	n.innerHTML = index;
	p.appendChild(n);
	var c = document.createElement("div");
	var s = document.createElement("p");
	s.style = "margin: 0px 0px 2px 0px;";
	s.innerHTML = subject;
	c.appendChild(s);
	var r = document.createElement("p");
	r.style = "margin: 2px 0px 0px 0px;";
	r.innerHTML = classroom;
	c.appendChild(r);
	return p;
}
function loaderButtonEvent() {
	var selectedClass = "";
	document.getElementById("class-selector").addEventListener("change", (event) => {
		selectedClass = event.target.value;
	});
	let dotw = "";
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
	for (i = 1; i < arr.length; i++) {
		document.getElementById("schedule").appendChild(createScheduleElement(i, arr.name, arr.classroom));
	}
}