import {
	format,
	isSameDay,
	isSameMonth,
	startOfWeek,
	endOfMonth,
	addDays,
	compareAsc,
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
			isCurrMonth: isSameMonth(currentDay, monthStart),
		});
		currentDay = addDays(currentDay, 1);
	}
	return daysOfWeek;
};

const GenerateOneMonth = (monthStart) => {
	const daysOfMonth = [];
	const monthEnd = endOfMonth(monthStart);
	let currentDay = monthStart;
	while (compareAsc(currentDay, monthEnd) < 0) {
		daysOfMonth.push(GenerateOneWeek(startOfWeek(currentDay), monthStart));
		currentDay = addDays(currentDay, DATE_WEEK_LENGTH);
	}
	return daysOfMonth;
};

export { GenerateOneWeek, GenerateOneMonth };
