import "./styles.css";
import ReactDOM from "react-dom/client";
interface ScheduleData {
	[key: string]: {
		[day: string]: {
			name: string;
			classroom: number[] | null;
			was: number[] | null;
		}[];
	};
}
function isNotNull(value: number[] | null): value is number[] {
	return value !== null;
}
var data: ScheduleData;
var xhr = new XMLHttpRequest();
xhr.open("GET", "../src/res/s20241007_middle.json", false);
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
	isReplacement,
}: {
	index: number;
	subject: string;
	classroom: number[] | null;
	isReplacement: boolean;
}): React.ReactElement {
	return (
		<div
			style={{
				alignItems: "center",
				display: "inline-flex",
				color: isReplacement ? "red" : "inherit",
			}}
		>
			<p
				style={{
					margin: "5px 13px 5px 5px",
					fontSize: "xxx-large",
					fontWeight: "bold",
					color: isReplacement ? "red" : "inherit",
				}}
			>
				{index}
			</p>
			<div>
				<p
					style={{
						margin: "0px 0px 2px 0px",
						color: isReplacement ? "red" : "inherit",
					}}
				>
					{subject}
				</p>
				<p
					style={{
						margin: "2px 0px 0px 0px",
						color: isReplacement ? "red" : "inherit",
					}}
				>
					{isNotNull(classroom) ? classroom.join("/") : "?"}
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
									isReplacement={isNotNull(arr[i].was)}
								/>
							);
						}
						tab.render(<>{nodes}</>);
					}
				}, 1000);
			}
		}, 1000);
	},
};

const loadButton = document.getElementById("loader-button");
if (loadButton) {
	loadButton.onclick = pageutils.loaderButtonEvent;
}

/*export function showcaseMode(): void {
	var randomNum: number = 5 + Math.floor(Math.random() * 3);
	for (var i = 0; i < randomNum; i++) {
		var clz: string = "";
		clz = clz.concat(Math.floor(Math.random() * 3).toString());
		clz = clz.concat((Math.floor(Math.random() * 10).toString()).padStart(2, '0'));
		var randomWas: boolean = Math.floor(Math.random() * 2) == 1;
		createScheduleElement(i+1, "Предмет", [Number(clz)] as number[], randomWas);
	}
}*/
