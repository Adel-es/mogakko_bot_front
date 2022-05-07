import {
	format,
	isSameDay,
	isSameMonth,
	startOfWeek,
	startOfMonth,
	addDays,
} from "date-fns";

const DATE_WEEK_LENGTH = 7;
const TODAY = new Date();

const GenerateOneWeek = (weekStart, monthStart) => {
	const daysOfWeek = [];
	let currentDay = weekStart;
	for (let i = 0; i < DATE_WEEK_LENGTH; i++) {
		daysOfWeek.push({
			currentDay: currentDay,
			formattedDate: format(currentDay, "d"),
			isToday: isSameDay(currentDay, TODAY),
			isCurMonth: isSameMonth(currentDay, monthStart),
		});
		currentDay = addDays(currentDay, 1);
	}
	return daysOfWeek;
};

const GenerateOneMonth = (monthStart) => {
	const daysOfMonth = [];
	let currentDay = monthStart;
	while (isSameMonth(currentDay, monthStart)) {
		currentDay = startOfWeek(currentDay);
		daysOfMonth.push(GenerateOneWeek(currentDay, monthStart));
		currentDay = addDays(currentDay, DATE_WEEK_LENGTH);
	}
	return daysOfMonth;
};

const GenerateCalendarOfCurrentMonth = (currentCalendarDate) => {
	return GenerateOneMonth(startOfMonth(currentCalendarDate));
};

export { GenerateOneWeek, GenerateOneMonth, GenerateCalendarOfCurrentMonth };
