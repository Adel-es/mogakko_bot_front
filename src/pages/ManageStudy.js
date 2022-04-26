import CalendarHeader from "../elements/CalendarHeader";
import CalendarBody from "../components/CalendarBody";
import { startOfYear, startOfMonth, format, sub, add } from "date-fns";
import { useState, useEffect } from "react";
const TODAY = new Date(); //Date(year, monthIndex, day)
function ManageStudy() {
	const getYear = (day) => {
		return format(day, "yyyy");
	};
	const getMonth = (day) => {
		return format(day, "MMMM");
	};
	const [currentDay, setCurrentDay] = useState(TODAY);
	const [year, setYear] = useState(getYear(currentDay));
	const [month, setMonth] = useState(getMonth(currentDay));

	const headerCallback = ({ left, right }) => {
		if (left && !right) {
			setCurrentDay((current) => sub(current, { months: 1 }));
		} else if (!left && right) {
			setCurrentDay((current) => add(current, { months: 1 }));
		} else {
			console.error("calendar header button is not working well");
		}
	};

	useEffect(() => {
		setYear(getYear(currentDay));
		setMonth(getMonth(currentDay));
	}, [currentDay]);

	return (
		<div>
			<CalendarHeader
				year={year}
				month={month}
				CallBackEvent={headerCallback}
			></CalendarHeader>
			<CalendarBody currentDay={currentDay}></CalendarBody>
		</div>
	);
}
export default ManageStudy;
