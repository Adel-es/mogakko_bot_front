import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ScheduleEvent } from "../../../pages/ScheduleManager";
import { useState, useCallback } from "react";
import { Button } from "@mui/material";

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

function DailyCalendar({
	selectedDay,
	schedulesOfSelectedDay,
	getSchedulesOnSelectedDay,
	onClose,
}: {
	selectedDay: Date;
	schedulesOfSelectedDay: Array<ScheduleEvent>;
	getSchedulesOnSelectedDay: (movedDate: Date) => Array<ScheduleEvent>;
	onClose: any;
}) {
	const [date, setDate] = useState(selectedDay);
	const onNavigate = useCallback(
		(newDate: Date) => {
			setDate(newDate);
			schedulesOfSelectedDay = getSchedulesOnSelectedDay(newDate);
		},
		[setDate]
	);
	return (
		<>
			<h2>{selectedDay.toDateString()}</h2>
			<Button onClick={onClose}>닫기</Button>
			<Calendar
				localizer={localizer}
				date={date}
				// startAccessor="start"
				// endAccessor="end"
				defaultView="day"
				events={schedulesOfSelectedDay}
				toolbar={false}
				style={{ height: "100%" }}
				onNavigate={onNavigate}
			/>
		</>
	);
}
export default DailyCalendar;
