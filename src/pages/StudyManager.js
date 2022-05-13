// import Calendar from "../components/calendar/Calendar";
import Calendar from "react-calendar";
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
		1,
		"정채ㅜ언",
		new Date(2022, 4, 30, 11, 0),
		new Date(2022, 4, 30, 12, 0),
		"test title",
		"test description"
	),
	ScheduleInfoStruct(
		2,
		"윤승ㅎ희",
		new Date(2022, 4, 26, 11, 0),
		new Date(2022, 4, 27, 12, 0),
		"test title2",
		"test description2"
	),
	ScheduleInfoStruct(
		3,
		"고선아ㅣ",
		new Date(2022, 4, 27, 22, 0),
		new Date(2022, 4, 28, 1, 0),
		"test title3",
		"test descipriont3"
	),
	ScheduleInfoStruct(
		4,
		"쥰내내내내ㅐ내내ㅐ긴이름TooLooooooooooooooong",
		new Date(2022, 4, 27, 22, 0),
		new Date(2022, 4, 28, 12, 0),
		"test title4",
		"test description4"
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

function test_mergePeopleInfoAndCalendar(
	calendarOfCurrentMonth,
	schedulesOfCurrentMonth
) {
	for (let schedule of schedulesOfCurrentMonth) {
		const weekIndex = getWeekOfMonth(schedule.startTime) - 1;
		const dayIndex = getDay(schedule.startTime);
		if ("schedules" in calendarOfCurrentMonth[weekIndex][dayIndex]) {
			calendarOfCurrentMonth[weekIndex][dayIndex]["schedules"].add(schedule.id);
		} else {
			calendarOfCurrentMonth[weekIndex][dayIndex]["schedules"] = new Set().add(
				schedule.id
			);
		}
	}
	return calendarOfCurrentMonth;
}

function getPeopleInfoOfSelectedDay(selectedDay, daysInfoOfMonth) {
	const weekIndex = getWeekOfMonth(selectedDay) - 1;
	const dayIndex = getDay(selectedDay);
	if ("peopleInfo" in daysInfoOfMonth[weekIndex][dayIndex]) {
		return daysInfoOfMonth[weekIndex][dayIndex]["peopleInfo"];
	}
	return [];
}

function getCalendarDayOfSelectedDay(selectedDay, calendarOfCurrentMonth) {
	const weekIndex = getWeekOfMonth(selectedDay) - 1;
	const dayIndex = getDay(selectedDay);
	console.log(weekIndex, dayIndex);
	return calendarOfCurrentMonth[weekIndex][dayIndex];
}

function getSchedulesOfSelectedDay(
	selectedDay,
	calendarOfCurrentMonth,
	schedulesOfCurrentMonth
) {
	const calendarDayOfSelectedDay = getCalendarDayOfSelectedDay(
		selectedDay,
		calendarOfCurrentMonth
	);
	if ("schedules" in calendarDayOfSelectedDay === false) return [];
	const scheduleIdsInSelectedDay = calendarDayOfSelectedDay["schedules"];
	const schedulesOfSelectedDay = [];
	for (const id of scheduleIdsInSelectedDay) {
		scheduleIdsInSelectedDay.push(schedulesOfCurrentMonth.get(id));
	}
	return schedulesOfSelectedDay;
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
	const [schedulesOfSelectedDay, setSchedulesOfSelectedDay] = useState([]);
	// let schedulesOfSelectedDay = [];
	// FIXME: test용 samplePeopleInfo를 넣기 위한 거, => API 연결 시, [] 빈 array로 초기화함.
	const [schedulesOfCurrentMonth, setSchedulesOfCurrentMonth] =
		useState(samplePeopleInfo);

	const [test_schedulesOfCurrentMonth, setTest_schedulesOfCurrentMonth] =
		useState(
			new Map(samplePeopleInfo.map((personInfo) => [personInfo.id, personInfo]))
		);

	// FIXME: mergePeople~~ 함수는 임시 test용 함수 (calendar와 schedule 정보를 array로 병합시킴.)
	//	calendarOfCurrentMonth 에는 각 day에 schedule의 id를 Set()으로 저장,
	//	schedulesOfCurrentMonth 에는 schedule을 Map(id, {schedule 정보})에 저장.
	const calendarOfCurrentMonth = mergePeopleInfoAndCalendar(
		currentCalendarDate,
		GenerateCalendarOfCurrentMonth(currentCalendarDate),
		schedulesOfCurrentMonth
	);
	const test_calendarOfCurrentMonth = test_mergePeopleInfoAndCalendar(
		GenerateCalendarOfCurrentMonth(currentCalendarDate),
		schedulesOfCurrentMonth
	);

	const handleSelectDayForDetail = ({
		_selectedDay,
		_dayClicked,
		// peopleInfoOfSelectedDay,
	}) => {
		setSelectedDay(_selectedDay);
		setDayClicked(_dayClicked);
		// setSchedulesOfSelectedDay(
		// 	getSchedulesOfSelectedDay(
		// 		_selectedDay,
		// 		calendarOfCurrentMonth,
		// 		schedulesOfCurrentMonth
		// 	)
		// );
		setSchedulesOfSelectedDay(
			getPeopleInfoOfSelectedDay(
				_selectedDay, // day
				calendarOfCurrentMonth
			)
		);
		console.log(
			getSchedulesOfSelectedDay(
				_selectedDay,
				calendarOfCurrentMonth,
				schedulesOfCurrentMonth
			)
		);
	};

	const handleCreateSchedule = (personInfo) => {
		setSchedulesOfCurrentMonth(schedulesOfCurrentMonth.concat([personInfo]));
	};
	console.log("Study Manager render");

	// TODO: samplePeopleInfo가 Calendar에 바로 반영이 되지 않고 있음
	// TODO: 다른 day를 클릭했을 때, create box가 사라지지 않음. 아예 detail view를 없애고 난 후, 다시 열어보면  create box가 사라져있음.
	return (
		<div>
			{/* <Calendar
				currentCalendarDate={currentCalendarDate}
				schedulesOfCurrentMonth={test_schedulesOfCurrentMonth}
				calendarOfCurrentMonth={test_calendarOfCurrentMonth}
				onMoveCalendarMonth={handleMoveCalendarMonth}
				onSelectDayForDetail={handleSelectDayForDetail}
			></Calendar> */}
			<Calendar></Calendar>
			{dayClicked ? (
				<DailyDetailInfo
					selectedDay={selectedDay}
					schedulesOfSelectedDay={schedulesOfSelectedDay}
					onCreateSchedule={handleCreateSchedule}
				></DailyDetailInfo>
			) : (
				""
			)}
		</div>
	);
}
export default StudyManager;
