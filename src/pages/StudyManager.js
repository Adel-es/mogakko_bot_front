import Calendar from "../components/calendar/Calendar";
import DailyDetailInfo from "../components/dailydetail/DailyDetailInfo";
import ScheduleInfoStruct from "../utils/schedule/ScheduleInfoStruct";
import {
	getDay,
	getWeekOfMonth,
	isSameMonth,
	compareAsc,
	sub,
	add,
} from "date-fns";
import { useState } from "react";
import { GenerateCalendarOfCurrentMonth } from "../utils/calendar/CalendarDateGeneration";

const samplePeopleInfo = [
	ScheduleInfoStruct(
		"정채ㅜ언",
		new Date(2022, 4, 30, 11, 0),
		new Date(2022, 4, 30, 12, 0)
	),
	ScheduleInfoStruct(
		"윤승ㅎ희",
		new Date(2022, 4, 26, 11, 0),
		new Date(2022, 4, 27, 12, 0)
	),
	ScheduleInfoStruct(
		"고선아ㅣ",
		new Date(2022, 4, 27, 22, 0),
		new Date(2022, 4, 28, 1, 0)
	),
	ScheduleInfoStruct(
		"쥰내내내내ㅐ내내ㅐ긴이름TooLooooooooooooooong",
		new Date(2022, 4, 27, 22, 0),
		new Date(2022, 4, 28, 12, 0)
	),
];

function mergePeopleInfoAndCalendar(currentDay, daysOfMonth, peopleInfo) {
	// 달력의 날짜 정보와, 각 날짜에 생성된 스케줄 정보를 병합함.
	peopleInfo.sort(function (p1, p2) {
		return compareAsc(p1.startTime, p2.startTime);
	});
	for (let person of peopleInfo) {
		if (!isSameMonth(currentDay, person.startTime)) continue;
		const weekIndex = getWeekOfMonth(person.startTime) - 1;
		const dayIndex = getDay(person.startTime);
		if ("peopleInfo" in daysOfMonth[weekIndex][dayIndex]) {
			daysOfMonth[weekIndex][dayIndex]["peopleInfo"].push(person);
		} else {
			daysOfMonth[weekIndex][dayIndex]["peopleInfo"] = [person];
		}
	}
	return daysOfMonth;
}

function getPeopleInfoOfSelectedDay(selectedDay, daysInfoOfMonth) {
	const weekIndex = getWeekOfMonth(selectedDay) - 1;
	const dayIndex = getDay(selectedDay);
	if ("peopleInfo" in daysInfoOfMonth[weekIndex][dayIndex]) {
		return daysInfoOfMonth[weekIndex][dayIndex]["peopleInfo"];
	}
	return [];
}

function StudyManager() {
	const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

	const handleMoveCalendarMonth = ({ left, right }) => {
		if (left && !right) {
			setCurrentCalendarDate((current) => sub(current, { months: 1 }));
		} else if (!left && right) {
			setCurrentCalendarDate((current) => add(current, { months: 1 }));
		} else {
			console.error("calendar header button is not working well");
		}
	};

	const [dayClicked, setDayClicked] = useState(false);
	const [selectedDay, setSelectedDay] = useState(new Date());
	const [peopleInfoOfSelectedDay, setPeopleInfoOfSelectedDay] = useState([]);
	// FIXME: test용 samplePeopleInfo를 넣기 위한 거, => API 연결 시, [] 빈 array로 초기화함.
	const [peopleInfoOfAllDay, setPeopleInfoOfAllDay] =
		useState(samplePeopleInfo);
	// FIXME: mergePeople~~ 함수는 임시 test용 함수 (calendar와 schedule 정보를 array로 병합시킴.)
	//	calendarOfCurrentMonth 에는 각 day에 schedule의 id를 Set()으로 저장,
	//	schedulesOfCurrentMonth 에는 schedule을 Map(id, {schedule 정보})에 저장.
	const schedulesOfCurrentMonth = mergePeopleInfoAndCalendar(
		currentCalendarDate,
		GenerateCalendarOfCurrentMonth(new Date()),
		peopleInfoOfAllDay
	);

	const handleSelectDayForDetail = ({
		_selectedDay,
		_dayClicked,
		// peopleInfoOfSelectedDay,
	}) => {
		setSelectedDay(_selectedDay);
		setDayClicked(_dayClicked);
		setPeopleInfoOfSelectedDay(
			getPeopleInfoOfSelectedDay(
				_selectedDay, // day
				schedulesOfCurrentMonth
			)
		);
	};

	const handleCreateNewSchedule = (personInfo) => {
		setPeopleInfoOfAllDay(peopleInfoOfAllDay.concat([personInfo]));
		console.log(peopleInfoOfAllDay);
	};

	// TODO: samplePeopleInfo가 Calendar에 바로 반영이 되지 않고 있음
	// TODO: 다른 day를 클릭했을 때, create box가 사라지지 않음. 아예 detail view를 없애고 난 후, 다시 열어보면  create box가 사라져있음.
	return (
		<div>
			<Calendar
				currentCalendarDate={currentCalendarDate}
				peopleInfo={peopleInfoOfAllDay}
				schedulesOfCurrentMonth={schedulesOfCurrentMonth}
				onMoveCalendarMonth={handleMoveCalendarMonth}
				onSelectDayForDetail={handleSelectDayForDetail}
			></Calendar>
			{dayClicked ? (
				<DailyDetailInfo
					selectedDay={selectedDay}
					peopleInfoOfSelectedDay={peopleInfoOfSelectedDay}
					createNewScheduleCallBack={handleCreateNewSchedule}
				></DailyDetailInfo>
			) : (
				""
			)}
		</div>
	);
}
export default StudyManager;
