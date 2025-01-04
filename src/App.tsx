import "./styles.css";
import ReactDOM from "react-dom/client";
type WasData = {
	name: string;
	classroom: number[] | null;
};
interface ScheduleData {
	[key: string]: {
		[day: string]: {
			name: string;
			classroom: number[] | null;
			was: WasData | null;
		}[];
	};
}
function isNotNull(value: WasData | null): value is WasData {
	return value !== null;
}
function arrayIsNotNull<A>(array: A[] | null): array is A[] {
	return array !== null;
}
var data: ScheduleData;
var xhr = new XMLHttpRequest();
xhr.open("GET", "../src/res/%schedule%", false);
xhr.send();
xhr.onerror = () => {
	console.error("Error while loading data");
};
if (xhr.status === 200) {
	data = JSON.parse(xhr.responseText) as ScheduleData;
} else {
	console.error(xhr.status.toString().concat(" ").concat(xhr.statusText));
}
function ScheduleElement({
	index,
	subject,
	classroom,
	wasData,
}: {
	index: number;
	subject: string;
	classroom: number[] | null;
	wasData: WasData | null;
}): React.ReactElement {
	return (
		<div
			style={{
				alignItems: "center",
				display: "inline-flex",
				color: "inherit",
			}}
		>
			<p
				style={{
					margin: "5px 13px 5px 5px",
					fontSize: "xxx-large",
					fontWeight: "bold",
					color: "inherit",
				}}
			>
				{index}
			</p>
			<div>
				<p
					style={{
						margin: "0px 0px 2px 0px",
						color: (isNotNull(wasData) && wasData.name != subject) ? "red" : "inherit",
					}}
					title={isNotNull(wasData) ? "Было: ".concat(wasData.name) : "Изначальное значение"}
				>
					{subject}
				</p>
				<p
					style={{
						margin: "2px 0px 0px 0px",
						color: (isNotNull(wasData) && wasData.classroom != classroom) ? "red" : "inherit",
					}}
					title={isNotNull(wasData) ? "Было: ".concat((arrayIsNotNull(wasData.classroom) ? wasData.classroom : "—").toString()) : "Изначальное значение"}
				>
					{arrayIsNotNull(classroom) ? classroom.join("/") : "—"}
				</p>
			</div>
		</div>
	);
}
export var pageutils = {
	loaderButtonEvent: () => {
		const classSelector = document.getElementById("class-selector");
		const scheduleTab = document.getElementById("schedule");
		const loadButton = document.getElementById("loader-button");

		let intervalId = setInterval(() => {
			if (classSelector && scheduleTab && loadButton) {
				clearInterval(intervalId);

				var selectedClass: string = "";
				classSelector.addEventListener("change", (event) => {
					if (event.target) {
						selectedClass = (event.target as HTMLOptionElement).value;
					}
				});
				let intervalId2 = setInterval(() => {
					if (selectedClass) {
						clearInterval(intervalId2);
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
								return;
						}
						const arr = data[selectedClass][dotw];
						var tab = ReactDOM.createRoot(scheduleTab);
						var nodes: Array<React.ReactNode> = [];
						for (var i = 1; i < arr.length; i++) {
							nodes.push(
								<ScheduleElement
									index={i}
									subject={arr[i].name}
									classroom={arr[i].classroom}
									wasData={arr[i].was}
								/>
							);
						}
						tab.render(<>{nodes}</>);
					}
				}, 1000);
			}
		}, 1000);
	},
	activateClock: () => {
		const year = document.getElementById("year");
		const month = document.getElementById("month");
		const day = document.getElementById("day");
		const hour = document.getElementById("hour");
		const minute = document.getElementById("minute");

		let intervalId3 = setInterval(() => {
			if (year && month && day && hour && minute) {
				clearInterval(intervalId3);
				setInterval(() => {
					let d: Date = new Date();
					year.innerText = d.getFullYear().toString();
					month.innerText = (d.getMonth() + 1).toString().padStart(2, '0');
					day.innerText = d.getDate().toString().padStart(2, '0');
					hour.innerText = d.getHours().toString().padStart(2, '0');
					minute.innerText = d.getMinutes().toString().padStart(2, '0');
				}, 1000);
			}
		}, 1000);
	}
};

const loadButton = document.getElementById("loader-button");
if (loadButton) {
	loadButton.onclick = pageutils.loaderButtonEvent;
}
if (document.getElementById("datetime")) {
	pageutils.activateClock();
}