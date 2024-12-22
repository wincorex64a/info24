import "./res/20241007.json";
const response = await fetch("20241007.json");
const data = JSON.parse(await response.text());
function ScheduleElement(index, subject, classroom) {
	return <div style="align-items: center; display-inline: flex;">
		<p style="margin: 5px 13px 5px 5px; font-size: xxx-large; font-weight: bold;">{index}</p>
		<div>
			<p style="margin: 0px 0px 2px 0px;">{subject}</p>
			<p style="margin: 2px 0px 0px 0px;">{classroom}</p>
		</div>
	</div>
}
window.onload = () => {
	
}