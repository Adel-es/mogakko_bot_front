import CalendarHeader from "../elements/CalendarHeader";
import CalendarBody from "../components/CalendarBody";
import { startOfYear, startOfMonth, format } from "date-fns";
import { useState } from "react";
const TODAY = new Date(); //Date(year, monthIndex, day)
function ManageStudy() {
	const getYear = (day) => {
		return format(day, "yyyy");
	};
	const getMonth = (day) => {
		return format(day, "MMMM");
	};
	const getDay = (day) => {
		return format(day, "dd");
	};
	const [currentDay, setCurrentDay] = useState(TODAY);
	const [year, setYear] = useState(getYear(currentDay));
	const [month, setMonth] = useState(getMonth(currentDay));
	const [day, setDay] = useState(getDay(currentDay));
	return (
		<div>
			<CalendarHeader year={year} month={month}></CalendarHeader>
			<CalendarBody currentDay={currentDay}></CalendarBody>
		</div>
	);
}
export default ManageStudy;
