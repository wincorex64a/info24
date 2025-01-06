import "./styles.css";
import ReactDOM from "react-dom/client";
type WasData = {
	name: string;
	classroom: number[] | null;
};
type DOTW = 
	"monday" | 
	"tuesday" | 
	"wednesday" | 
	"thursday" | 
	"friday" | 
	"saturday";
interface ScheduleData {
	classes: {
		[key: string]: {
			[day: string]: {
				name: string;
				classroom: number[] | null;
				was: WasData | null;
			}[];
		};
	};
}

function isNotNull(value: WasData | null): value is WasData {
	return value !== null;
}
function arrayIsNotNull<T>(array: Array<T> | null): array is Array<T> {
	return array !== null;
}
var data: ScheduleData;
var xhr = new XMLHttpRequest();
xhr.open("GET", "../src/res/s20250901.json", false);
xhr.send();
if (xhr.status === 200) {
	data = JSON.parse(xhr.responseText) as ScheduleData;
} else {
	console.error(xhr.status.toString().concat(" ", xhr.statusText));
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
	launchScheduleLoader: () => {
		const classSelector = document.getElementById("class-selector");
		const scheduleTab = document.getElementById("schedule");
		var tab: ReactDOM.Root;
		let intervalId = setInterval(() => {
			if (classSelector && scheduleTab) {
				clearInterval(intervalId);
				tab = ReactDOM.createRoot(scheduleTab);
				var selectedClass: string;
				classSelector.addEventListener("change", (event) => {
					if (event.target) {
						selectedClass = "_".concat((event.target as HTMLOptionElement).value.split("_").reverse().join(""));
						tab.unmount();
						tab = ReactDOM.createRoot(scheduleTab);
						console.log(selectedClass);
					}
				});
				let intervalId2 = setInterval(() => {
					if (selectedClass) {
						let dotw: DOTW;
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
								return;
						}
						console.log(dotw);
						var arr = data.classes[selectedClass][dotw] || [
							{name: "Предмет 1", classroom: null, was: null},
							{name: "Предмет 2", classroom: [109], was: {name: "Предмет 1", classroom: null} as WasData},
							{name: "Предмет 3", classroom: [205], was: {name: "Предмет 3", classroom: [207]} as WasData},
							{name: "Предмет 4", classroom: [202], was: {name: "Предмет 2", classroom: [201]}},
							{name: "Пр.5/Пр.6", classroom: [103,216], was: null},
							{name: "Пр.6/Пр.5", classroom: [216,103], was: {name: "Пр.5/Пр.6", classroom: [103,216]} as WasData}
						];
						console.log(arr);
						var nodes: Array<React.ReactNode> = [];
						for (var i = 0; i < arr.length; i++) {
							nodes.push(
								<ScheduleElement
									index={i+1}
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

if (document.getElementById("datetime") && document.getElementById("schedule")) {
	pageutils.launchScheduleLoader();
	pageutils.activateClock();
}