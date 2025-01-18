import "./styles.css";
import ReactDOM from "react-dom/client";
import React from "react";
const current: string = "20250901";
const previous: string = "" || current;
interface ScheduleData {
	classes: {
		[key: string]: {
			[day: string]: {
				name: string;
				classroom: number[] | null;
			}[];
		};
	};
}

function isNotNull<T>(value: T | null): value is T {
	return value !== null;
}
function arrayIsNotNull<T>(array: Array<T> | null): array is Array<T> {
	return array !== null;
}



let data: ScheduleData;
let xhr: XMLHttpRequest = new XMLHttpRequest();
xhr.open("GET", "../src/res/s" + current + ".json", false);
xhr.send();
if (xhr.status === 200) {
	data = JSON.parse(xhr.responseText) as ScheduleData;
} else {
	console.error(xhr.status.toString().concat(" ", xhr.statusText));
}

let prev_data: ScheduleData;
let next_xhr: XMLHttpRequest = new XMLHttpRequest();
next_xhr.open("GET", "../src/res/s" + previous + ".json", false);
next_xhr.send();
if (next_xhr.status === 200) {
    prev_data = JSON.parse(next_xhr.responseText) as ScheduleData;
} else {
    console.error(next_xhr.status.toString().concat(" ", next_xhr.statusText));
}
function ScheduleElement({
	index,
	subject,
	classroom,
	prev_subject,
	prev_classroom,
}: {
	index: number;
	subject: string;
	classroom: number[] | null;
	prev_subject: string;
	prev_classroom: number[] | null;
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
				className="subject_number"
				style={{
					display: "grid",
					justifyContent: "center",
					margin: "5px 13px 5px 5px",
					fontSize: "xxx-large",
					fontWeight: "bold",
					width: 30,
					color: "inherit",
				}}
			>
				{index}
			</p>
			<div>
				<p
					className="subject_name"
					style={{
						margin: "0px 0px 2px 0px",
						color: (subject != prev_subject ? "red" : "inherit"),
					}}
				>
					{subject}
				</p>
				<p
					className="subject_location"
					style={{
						margin: "2px 0px 0px 0px",
						color: (classroom?.toString() != prev_classroom?.toString()) ? "red" : "inherit",
					}}
				>
					{arrayIsNotNull(classroom) ? classroom.join("/") : "—"}
				</p>
			</div>
		</div>
	);
}
export let pageutils: {
	launchScheduleLoader: () => void,
	activateClock: () => void
} = {
	launchScheduleLoader: (): void => {
		const classSelector: HTMLElement | null = document.getElementById("class-selector");
		const scheduleTab: HTMLElement | null = document.getElementById("schedule");
		let tab: ReactDOM.Root;
		let intervalId: number = setInterval((): void => {
			if (classSelector && scheduleTab) {
				clearInterval(intervalId);
				tab = ReactDOM.createRoot(scheduleTab);
				let selectedClass: string;
				classSelector.addEventListener("change", (event: Event): void => {
					if (event.target) {
						selectedClass = "_".concat((event.target as HTMLOptionElement).value.split("_").reverse().join(""));
					}
				});
				/*let intervalId2 = */setInterval((): void => {
				    if (selectedClass) {
				        let dotw: string;
				        const dotwSelector = document.getElementById('dotw-selector') as HTMLSelectElement;
				        if (dotwSelector) {
				            dotw = dotwSelector.value;
				        } else {
				            console.error('Day of the week selector not found');
				            return;
				        }

				        let arr: {name: string, classroom: number[] | null}[] = data.classes[selectedClass][dotw];
				        let prev_arr: {name: string, classroom: number[] | null}[] = prev_data.classes[selectedClass][dotw];
				        let nodes: Array<React.ReactNode> = [];
				        for (let i: number = 0; i < arr.length; i++) {
				            nodes.push(
				                <ScheduleElement
				                    index={i+1}
				                    subject={arr[i].name}
				                    classroom={arr[i].classroom}
				                    prev_subject={prev_arr[i].name}
				                    prev_classroom={prev_arr[i].classroom}
				                />
				            );
				        }
				        tab.render(<>{nodes}</>);
				    }
				}, 256);
			}
		}, 1000);
	},
	activateClock: (): void => {
		const year: HTMLElement | null = document.getElementById("year");
		const month: HTMLElement | null = document.getElementById("month");
		const day: HTMLElement | null = document.getElementById("day");
		const hour: HTMLElement | null = document.getElementById("hour");
		const minute: HTMLElement | null = document.getElementById("minute");

		let intervalId3: number = setInterval((): void => {
			if (year && month && day && hour && minute) {
				clearInterval(intervalId3);
				setInterval((): void => {
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