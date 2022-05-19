import {
	startOfWeek,
	endOfMonth,
	startOfMonth,
	addDays,
	compareAsc,
} from "date-fns";

const DATE_WEEK_LENGTH = 7;

const GenerateOneMonth = (monthStart) => {
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

const GenerateCalendarOfCurrentMonth = (currentCalendarDate) => {
	return GenerateOneMonth(startOfMonth(currentCalendarDate));
};

export { GenerateCalendarOfCurrentMonth };
