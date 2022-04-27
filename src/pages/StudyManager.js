import Calendar from "../components/calendar/Calendar";
import DailyDetailInfo from "../components/dailydetail/DailyDetailInfo";
import { useState, useEffect } from "react";

const TODAY = new Date(); //Date(year, monthIndex, day)

function StudyManager() {
	const [dayClicked, setDayClicked] = useState(false);
	const [selectedDay, setSelectedDay] = useState(TODAY);

	const selectedDayCallBack = ({ selectedDay, dayClicked }) => {
		setSelectedDay(selectedDay);
		setDayClicked(dayClicked);
	};

	return (
		<div>
			<Calendar selectedDayCallBack={selectedDayCallBack}></Calendar>
			{dayClicked ? (
				<DailyDetailInfo selectedDay={selectedDay}></DailyDetailInfo>
			) : (
				""
			)}
		</div>
	);
}
export default StudyManager;
