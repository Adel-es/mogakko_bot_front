import {
	set,
	getYear,
	getMonth,
	getDate,
	getHours,
	getMinutes,
} from "date-fns";

export function setYearMonthDate(changedDate: Date, newDate: Date): Date {
	return set(changedDate, {
		year: getYear(newDate),
		month: getMonth(newDate),
		date: getDate(newDate),
	});
}

export function setHourMinute(changedDate: Date, newDate: Date): Date {
	return set(changedDate, {
		hours: getHours(newDate!),
		minutes: getMinutes(newDate!),
	});
}
