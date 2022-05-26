import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Schedule } from "../../utils/schedule/ScheduleInfoStruct";
import { EachDateType } from "../../utils/calendar/MonthListGenerator";
import { useCallback } from "react";

const locales = {
	"en-US": enUS,
};

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

interface MonthlyCalendarProp {
	calendarOfCurrentMonth: Map<string, EachDateType>;
	schedulesOfCurrentMonth: Map<number, Schedule>;
	onClickDayOnCalendar: any;
	onActiveStartDateChangeOnCalendar: any;
}
function MonthlyCalendar({
	calendarOfCurrentMonth,
	schedulesOfCurrentMonth,
	onClickDayOnCalendar,
	onActiveStartDateChangeOnCalendar,
}: MonthlyCalendarProp) {
	const onSelectSlot = useCallback((slotInfo: any) => {
		/**
		 * Here we are waiting 250 milliseconds (use what you want) prior to firing
		 * our method. Why? Because both 'click' and 'doubleClick'
		 * would fire, in the event of a 'doubleClick'. By doing
		 * this, the 'click' handler is overridden by the 'doubleClick'
		 * action.
		 */
		onClickDayOnCalendar();
	}, []);
	return (
		<Calendar
			localizer={localizer}
			startAccessor="start"
			endAccessor="end"
			style={{ minWidth: 600, height: 800 }}
			events={Array.from(schedulesOfCurrentMonth.values())}
			titleAccessor={"name"}
			onSelectSlot={onSelectSlot}
			views={["month", "day", "agenda"]}
		></Calendar>
	);
}
export default MonthlyCalendar;
