import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import { useState, useEffect } from "react";
import { format, sub, add } from "date-fns";
import PropTypes from "prop-types";

const TODAY = new Date(); //Date(year, monthIndex, day)

function Calendar({ peopleInfo, selectedDayCallBack }) {
	const getYear = (day) => {
		return format(day, "yyyy");
	};
	const getMonth = (day) => {
		return format(day, "MMMM");
	};
	const [currentDay, setCurrentDay] = useState(TODAY);
	const [year, setYear] = useState(getYear(currentDay));
	const [month, setMonth] = useState(getMonth(currentDay));

	const headerCallBack = ({ left, right }) => {
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
				CallBackEvent={headerCallBack}
			></CalendarHeader>
			<CalendarBody
				currentDay={currentDay}
				peopleInfo={peopleInfo}
				selectedDayCallBack={selectedDayCallBack}
			></CalendarBody>
		</div>
	);
}
Calendar.propTypes = {
	peopleInfo: PropTypes.array,
	selectedDayCallBack: PropTypes.func.isRequired,
};
export default Calendar;
