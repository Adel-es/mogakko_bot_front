import {
	startOfWeek,
	endOfMonth,
	startOfMonth,
	addDays,
	compareAsc,
	differenceInCalendarDays,
} from "date-fns";
import { EachDateType, Schedule } from "../../type/CommonInterfaces";

const DATE_WEEK_LENGTH = 7;

const GenerateOneMonth = (monthStart: Date): Map<string, EachDateType> => {
	const daysOfMonth = new Map();
	const monthEnd = endOfMonth(monthStart);
	let currentDay = startOfWeek(monthStart);
	while (compareAsc(currentDay, monthEnd) <= 0) {
		for (let i = 0; i < DATE_WEEK_LENGTH; i++) {
			daysOfMonth.set(currentDay.toDateString(), {
				date: currentDay,
				schedules: new Set(),
			});
			currentDay = addDays(currentDay, 1);
		}
	}
	return daysOfMonth;
};

export const GenerateCalendarOfCurrentMonth = (currentCalendarDate: Date) => {
	return GenerateOneMonth(startOfMonth(currentCalendarDate));
};

export function mergeCalendarWithSchedule(
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

export function mergeCalendarWithSchedules(
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

export function getSchedulesOnSelectedDay(
	selectedDay: Date,
	calendarOfCurrentMonth: Map<string, EachDateType>,
	schedulesOfCurrentMonth: Map<number, Schedule>
): Array<Schedule> {
	/**
	 * @returns : 특정 날짜에 속하는 일정 리스트 (big-calendar의 event 형식)
	 */
	if (!calendarOfCurrentMonth.has(selectedDay.toDateString())) return [];
	// console.log("in func:", selectedDay);
	const idsOfSelectedDay = Array.from(
		calendarOfCurrentMonth.get(selectedDay.toDateString())!.schedules
	);
	const schedulesOfSelectedDay = idsOfSelectedDay.map(
		(id) => schedulesOfCurrentMonth.get(id)!
	);

	return schedulesOfSelectedDay;
}
