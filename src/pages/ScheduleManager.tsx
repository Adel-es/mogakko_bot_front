import DailyDetailInfo from "../components/dailydetail/DailyDetailInfo";
import {
	Schedule,
	ScheduleInfoStruct,
} from "../utils/schedule/ScheduleInfoStruct";
import { differenceInCalendarDays, addDays } from "date-fns";
import { useState } from "react";
import { GenerateCalendarOfCurrentMonth } from "../utils/calendar/MonthListGenerator";
import { EachDateType } from "../utils/calendar/MonthListGenerator";
import MonthlyCalendar from "../components/calendar/MonthlyCalendar";
import ScheduleInputBox from "../components/schedule/ScheduleInputBox";
import ScheduleInputPopUpBox from "../components/schedule/ScheduleInputPopUpBox";

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

function mergeCalendarAndSchedules(
	calendarOfCurrentMonth: Map<string, EachDateType>,
	schedulesOfCurrentMonth: Map<number, Schedule>
): Map<string, EachDateType> {
	console.log("&&schedulesOfCurrentMonth: ", schedulesOfCurrentMonth);
	for (let [key, schedule] of schedulesOfCurrentMonth) {
		const distance = differenceInCalendarDays(
			schedule["endTime"],
			schedule["startTime"]
		);
		const containedDates = [];
		for (let i = 0; i < distance + 1; i++) {
			console.log(
				" Plus Date: ",
				addDays(schedule["startTime"], i).toDateString()
			);
			containedDates.push(addDays(schedule["startTime"], i).toDateString());
		}
		for (const date of containedDates) {
			if (!calendarOfCurrentMonth.has(date)) continue;
			calendarOfCurrentMonth.get(date)!["schedules"].add(schedule.id);
		}
	}
	return calendarOfCurrentMonth;
}

function getSchedulesOnSelectedDay(
	selectedDay: Date,
	calendarOfCurrentMonth: Map<string, EachDateType>,
	schedulesOfCurrentMonth: Map<number, Schedule>
): Array<Schedule> {
	if (!calendarOfCurrentMonth.has(selectedDay.toDateString())) return [];
	console.log("in func:", selectedDay);
	const idsOfSelectedDay = Array.from(
		calendarOfCurrentMonth.get(selectedDay.toDateString())!["schedules"]
	);
	const schedulesOfSelectedDay = idsOfSelectedDay.map(
		(id) => schedulesOfCurrentMonth.get(id)!
	);

	return schedulesOfSelectedDay;
}

function StudyManager() {
	const [startDateOnCalendar, setStartDateOnCalendar] = useState(new Date());
	const [dayClicked, setDayClicked] = useState(false);
	const [selectedDay, setSelectedDay] = useState(new Date());
	const [schedulesOfCurrentMonth, setSchedulesOfCurrentMonth] = useState(
		new Map(samplePeopleInfo.map((personInfo) => [personInfo.id, personInfo]))
	);

	/**
	 * calendarOfCurrentMonth 에는 각 day에 schedule의 id를 Set()으로 저장,
	 * schedulesOfCurrentMonth 에는 schedule을 Map(id, {schedule 정보})에 저장.
	 */
	// console.log("&&schedulesOfCurrentMonth: ", schedulesOfCurrentMonth);
	const calendarOfCurrentMonth = mergeCalendarAndSchedules(
		GenerateCalendarOfCurrentMonth(startDateOnCalendar),
		schedulesOfCurrentMonth
	);
	console.log("calendarOfCurrentMonth: ", calendarOfCurrentMonth);
	const schedulesOfSelectedDay = getSchedulesOnSelectedDay(
		selectedDay,
		calendarOfCurrentMonth,
		schedulesOfCurrentMonth
	);

	const handleClickDayOnCalendar = ({
		_selectedDay,
	}: {
		_selectedDay: Date;
	}) => {
		if (selectedDay.toDateString() === _selectedDay.toDateString()) {
			setDayClicked((current) => !current);
		} else {
			setDayClicked(true);
			setSelectedDay(_selectedDay);
		}
	};
	const handleActiveStartDateChangeOnCalendar = (prop: { startDate: Date }) => {
		setStartDateOnCalendar(prop.startDate);
	};

	// TODO: create가 안됨.
	const handleCreateSchedule = (personInfo: Schedule) => {
		const tempId = schedulesOfCurrentMonth.size + 1;
		setSchedulesOfCurrentMonth((prev) => new Map(prev).set(tempId, personInfo));
	};
	console.log("Study Manager render");
	console.log("schedulesOfCurrentMonth: ", schedulesOfCurrentMonth);
	console.log("schedulesOfSelectedDay: ", schedulesOfSelectedDay);

	const handleCloseSchedulePopupBox = () => {
		setDayClicked(false);
	};
	// TODO: samplePeopleInfo가 Calendar에 바로 반영이 되지 않고 있음
	// TODO: 다른 day를 클릭했을 때, create box가 사라지지 않음. 아예 detail view를 없애고 난 후, 다시 열어보면  create box가 사라져있음.
	return (
		<div>
			<MonthlyCalendar
				calendarOfCurrentMonth={calendarOfCurrentMonth}
				schedulesOfCurrentMonth={schedulesOfCurrentMonth}
				onClickDayOnCalendar={handleClickDayOnCalendar}
				onActiveStartDateChangeOnCalendar={
					handleActiveStartDateChangeOnCalendar
				}
			></MonthlyCalendar>
			<ScheduleInputPopUpBox
				defaultContent={{ startDate: selectedDay, endDate: selectedDay }}
				onOpen={dayClicked}
				onClose={handleCloseSchedulePopupBox}
			></ScheduleInputPopUpBox>
			{/* {dayClicked ? (
				<ScheduleInputBox
					startDate={new Date()}
					endDate={new Date()}
				></ScheduleInputBox>
			) : (
				// <DailyDetailInfo
				//   selectedDay={selectedDay}
				//   schedulesOfSelectedDay={schedulesOfSelectedDay}
				//   onCreateSchedule={handleCreateSchedule}
				// ></DailyDetailInfo>
				""
			)} */}
		</div>
	);
}
export default StudyManager;
