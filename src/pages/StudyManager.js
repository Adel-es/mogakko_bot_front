import Calendar from "../components/calendar/Calendar";
import DailyDetailInfo from "../components/dailydetail/DailyDetailInfo";
import { useState } from "react";
const TODAY = new Date(); //Date(year, monthIndex, day)

const samplePersonInfo = (name, startTime, endTime) => {
	return {
		name: name,
		startTime: startTime,
		endTime: endTime,
	};
};
const samplePeopleInfo = [
	samplePersonInfo(
		"정채ㅜ언",
		new Date(2022, 4, 30, 11, 0),
		new Date(2022, 4, 30, 12, 0)
	),
	samplePersonInfo(
		"윤승ㅎ희",
		new Date(2022, 4, 26, 11, 0),
		new Date(2022, 4, 27, 12, 0)
	),
	samplePersonInfo(
		"고선아ㅣ",
		new Date(2022, 4, 27, 22, 0),
		new Date(2022, 4, 28, 1, 0)
	),
	samplePersonInfo(
		"쥰내내내내ㅐ내내ㅐ긴이름TooLooooooooooooooong",
		new Date(2022, 4, 27, 22, 0),
		new Date(2022, 4, 28, 12, 0)
	),
];

function StudyManager() {
	const [dayClicked, setDayClicked] = useState(false);
	const [selectedDay, setSelectedDay] = useState(TODAY);
	const [peopleInfoOfSelectedDay, setPeopleInfoOfSelectedDay] = useState([]);
	const selectedDayCallBack = ({
		selectedDay,
		dayClicked,
		peopleInfoOfSelectedDay,
	}) => {
		setSelectedDay(selectedDay);
		setDayClicked(dayClicked);
		setPeopleInfoOfSelectedDay(peopleInfoOfSelectedDay);
	};
	const createNewScheduleCallBack = ({ personInfo }) => {
		samplePeopleInfo.push(personInfo);
	};

	return (
		<div>
			<Calendar
				selectedDayCallBack={selectedDayCallBack}
				peopleInfo={samplePeopleInfo}
			></Calendar>
			{dayClicked ? (
				<DailyDetailInfo
					selectedDay={selectedDay}
					peopleInfoOfSelectedDay={peopleInfoOfSelectedDay}
					createNewScheduleCallBack={createNewScheduleCallBack}
				></DailyDetailInfo>
			) : (
				""
			)}
		</div>
	);
}
export default StudyManager;
