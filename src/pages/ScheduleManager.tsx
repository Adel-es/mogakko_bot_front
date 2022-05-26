import {
	Schedule,
	samplePeopleInfo,
} from "../utils/schedule/ScheduleInfoStruct";
import { differenceInCalendarDays, addDays } from "date-fns";
import { useState } from "react";
import { GenerateCalendarOfCurrentMonth } from "../utils/calendar/MonthListGenerator";
import { EachDateType } from "../utils/calendar/MonthListGenerator";
import MonthlyCalendar from "../components/calendar/MonthlyCalendar";

function mergeCalendarWithSchedule(
	calendarOfCurrentMonth: Map<string, EachDateType>,
	schedule: Schedule
): Map<string, EachDateType> {
	/**
	 * @returns : 스케쥴 리스트를 병합한 한 달(선택한 월) 날짜 리스트
	 */
	const schedulePeriod = differenceInCalendarDays(schedule.end, schedule.start);
	const containedDates = [];
	for (let i = 0; i <= schedulePeriod; i++) {
		// console.log(" Plus Date: ", addDays(schedule.start, i).toDateString());
		containedDates.push(addDays(schedule.start, i).toDateString());
	}
	for (const date of containedDates) {
		if (!calendarOfCurrentMonth.has(date)) continue;
		calendarOfCurrentMonth.get(date)!.schedules.add(schedule.id);
	}
	return calendarOfCurrentMonth;
}

function mergeCalendarWithSchedules(
	calendarOfCurrentMonth: Map<string, EachDateType>,
	schedulesOfCurrentMonth: Map<number, Schedule>
): Map<string, EachDateType> {
	/**
	 * @returns : 스케쥴 리스트를 병합한 한 달(선택한 월) 날짜 리스트
	 */
	for (let [key, schedule] of schedulesOfCurrentMonth) {
		// TODO: 비효율적인 객체 복사 & 할당을 거치고 있음.
		calendarOfCurrentMonth = mergeCalendarWithSchedule(
			calendarOfCurrentMonth,
			schedule
		);
	}
	return calendarOfCurrentMonth;
}

export interface ScheduleEvent {
	name: string;
	start: Date;
	end: Date;
	resource: {
		title: string;
		content: string;
	};
}
function getSchedulesOnSelectedDay(
	selectedDay: Date,
	calendarOfCurrentMonth: Map<string, EachDateType>,
	schedulesOfCurrentMonth: Map<number, Schedule>
): Array<ScheduleEvent> {
	/**
	 * @returns : 특정 날짜에 속하는 일정 리스트 (big-calendar의 event 형식)
	 */
	if (!calendarOfCurrentMonth.has(selectedDay.toDateString())) return [];
	// console.log("in func:", selectedDay);
	const idsOfSelectedDay = Array.from(
		calendarOfCurrentMonth.get(selectedDay.toDateString())!.schedules
	);
	const schedulesOfSelectedDay = idsOfSelectedDay.map((id) => {
		const schedule = schedulesOfCurrentMonth.get(id)!;
		return {
			name: schedule.name,
			start: schedule.start,
			end: schedule.end,
			resource: { title: schedule.title, content: schedule.content },
		};
	});

	return schedulesOfSelectedDay;
}

function StudyManager() {
	const [startDateOnCalendar, setStartDateOnCalendar] = useState(new Date());
	// const [dayClicked, setDayClicked] = useState(false);
	// const [dayDoubleClicked, setDayDoubleClicked] = useState(false);
	const [selectedDay, setSelectedDay] = useState(new Date());
	const [schedulesOfCurrentMonth, setSchedulesOfCurrentMonth] = useState(
		new Map(samplePeopleInfo.map((personInfo) => [personInfo.id, personInfo]))
	);

	/**
	 * calendarOfCurrentMonth 에는 각 day에 schedule의 id를 Set()으로 저장,
	 * schedulesOfCurrentMonth 에는 schedule을 Map(id, {schedule 정보})에 저장.
	 */
	let calendarOfCurrentMonth = mergeCalendarWithSchedules(
		GenerateCalendarOfCurrentMonth(startDateOnCalendar),
		schedulesOfCurrentMonth
	);

	// let schedulesOfSelectedDay = getSchedulesOnSelectedDay(
	// 	selectedDay,
	// 	calendarOfCurrentMonth,
	// 	schedulesOfCurrentMonth
	// );

	// function addSchedule(schedule: Schedule);

	// const handleCloseSchedulePopupBox = () => {
	// 	setDayClicked(false);
	// };

	// const handleActiveStartDateChangeOnMonthlyCalendar = (prop: {
	// 	startDate: Date;
	// }) => {
	// 	setStartDateOnCalendar(prop.startDate);
	// };

	// TODO: create가 안됨.
	const handleCreateSchedule = (personInfo: Schedule) => {
		// FIXME: temp code
		const tempId = schedulesOfCurrentMonth.size + 1;
		personInfo["id"] = tempId;
		console.log(personInfo);

		calendarOfCurrentMonth = mergeCalendarWithSchedule(
			calendarOfCurrentMonth,
			personInfo
		);
		setSchedulesOfCurrentMonth((prev) =>
			new Map(prev).set(personInfo["id"], personInfo)
		);
	};

	return (
		<div>
			<MonthlyCalendar
				calendarOfCurrentMonth={calendarOfCurrentMonth}
				schedulesOfCurrentMonth={schedulesOfCurrentMonth}
				onCreateSchedule={handleCreateSchedule}
			></MonthlyCalendar>
		</div>
	);
}
export default StudyManager;
