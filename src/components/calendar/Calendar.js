import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import { useState, useEffect } from "react";
import { startOfYear, startOfMonth, format, sub, add } from "date-fns";

const TODAY = new Date(); //Date(year, monthIndex, day)

function Calendar({ selectedDayCallBack }) {
	const getYear = (day) => {
		return format(day, "yyyy");
	};
	const getMonth = (day) => {
		return format(day, "MMMM");
	};
	const [currentDay, setCurrentDay] = useState(TODAY);
	const [year, setYear] = useState(getYear(currentDay));
	const [month, setMonth] = useState(getMonth(currentDay));
	const [dayClicked, setDayClicked] = useState(false);
	const [selectedDay, setSelectedDay] = useState(TODAY);

	const headerCallBack = ({ left, right }) => {
		if (left && !right) {
			setCurrentDay((current) => sub(current, { months: 1 }));
		} else if (!left && right) {
			setCurrentDay((current) => add(current, { months: 1 }));
		} else {
			console.error("calendar header button is not working well");
		}
	};

	const selectedDayCallBackDelivery = ({ selectedDay, dayClicked }) => {
		selectedDayCallBack({ selectedDay: selectedDay, dayClicked: dayClicked });
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
				CallBackEvent={headerCallBack}
			></CalendarHeader>
			<CalendarBody
				currentDay={currentDay}
				CallBackEvent={selectedDayCallBackDelivery}
			></CalendarBody>
		</div>
	);
}
export default Calendar;
