import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Schedule } from "../../utils/schedule/ScheduleInfoStruct";
import { EachDateType } from "../../utils/calendar/MonthListGenerator";
import { useState, useCallback, useRef } from "react";
import ScheduleInputPopUpBox from "../schedule/ScheduleInputPopUpBox";
import { ScheduleInputProps } from "../schedule/ScheduleInputBox";

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
	onCreateSchedule: any;
}
function MonthlyCalendar({
	calendarOfCurrentMonth,
	schedulesOfCurrentMonth,
	onCreateSchedule,
}: MonthlyCalendarProp) {
	const [isSelectSlot, setIsSelectSlot] = useState<boolean>(false);
	const [isSelectEvent, setIsSelectEvent] = useState<boolean>(false);
	const defaultPropForScheduleBox = useRef<ScheduleInputProps>({
		startDate: new Date(),
		endDate: new Date(),
	});

	const handleSelectSlot = useCallback((slotInfo: any) => {
		const date = slotInfo.slots[0];
		defaultPropForScheduleBox.current = { startDate: date, endDate: date };
		setIsSelectSlot(true);
	}, []);

	const handleSelectEvent = useCallback((event: Schedule) => {
		defaultPropForScheduleBox.current = {
			title: event.title,
			startDate: event.start,
			endDate: event.end,
			content: event.content,
		};
		setIsSelectEvent(true);

		console.log(event);
	}, []);

	const handleCloseSchedulePopupBox = () => {
		setIsSelectSlot(false);
		setIsSelectEvent(false);
	};

	return (
		<>
			<Calendar
				localizer={localizer}
				style={{ minWidth: 600, height: 800 }}
				events={Array.from(schedulesOfCurrentMonth.values())}
				startAccessor="start"
				endAccessor="end"
				titleAccessor="name"
				selectable
				onSelectSlot={handleSelectSlot}
				onSelectEvent={handleSelectEvent}
				views={["month", "day", "agenda"]}
				popup
			></Calendar>
			{isSelectSlot && (
				<ScheduleInputPopUpBox
					defaultSchedule={defaultPropForScheduleBox.current}
					open={isSelectSlot}
					onClose={handleCloseSchedulePopupBox}
					onSave={onCreateSchedule}
				></ScheduleInputPopUpBox>
			)}
			{isSelectEvent && (
				<ScheduleInputPopUpBox
					defaultSchedule={defaultPropForScheduleBox.current}
					open={isSelectEvent}
					readonly={true}
					onClose={handleCloseSchedulePopupBox}
				></ScheduleInputPopUpBox>
			)}
		</>
	);
}
export default MonthlyCalendar;
