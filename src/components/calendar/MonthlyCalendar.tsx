import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Schedule } from "../../utils/schedule/ScheduleInfoStruct";
import { EachDateType } from "../../utils/calendar/MonthListGenerator";
import { useState, useCallback, useRef } from "react";
import ScheduleInputPopUpBox from "../schedule/ScheduleInputPopUpBox";

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
	onCreateSchedule: (schedule: Schedule) => void;
	onUpdateSchedule: (schedule: Schedule) => void;
	onDeleteSchedule: (schedule: Schedule) => void;
}
function getDefaultSchedule(): Schedule {
	return {
		id: 0,
		title: "",
		name: "test name", // FIXME: 이름 가져오기
		start: new Date(),
		end: new Date(),
		content: "",
	};
}
function MonthlyCalendar({
	calendarOfCurrentMonth,
	schedulesOfCurrentMonth,
	onCreateSchedule,
	onUpdateSchedule,
	onDeleteSchedule,
}: MonthlyCalendarProp) {
	const [isSelectSlot, setIsSelectSlot] = useState<boolean>(false);
	const [isSelectEvent, setIsSelectEvent] = useState<boolean>(false);
	const defaultPropForScheduleBox = useRef<Schedule>(getDefaultSchedule());

	const handleSelectSlot = useCallback((slotInfo: any) => {
		const date = slotInfo.slots[0];
		defaultPropForScheduleBox.current = getDefaultSchedule();
		defaultPropForScheduleBox.current.start = date;
		defaultPropForScheduleBox.current.end = date;
		setIsSelectSlot(true);
	}, []);

	const handleSelectEvent = useCallback((event: Schedule) => {
		defaultPropForScheduleBox.current = event;
		setIsSelectEvent(true);

		// console.log(event);
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
					readonly={false}
					onClose={handleCloseSchedulePopupBox}
					onSave={onCreateSchedule}
					onUpdate={onUpdateSchedule}
					onDelete={onDeleteSchedule}
				></ScheduleInputPopUpBox>
			)}
			{isSelectEvent && (
				<ScheduleInputPopUpBox
					defaultSchedule={defaultPropForScheduleBox.current}
					open={isSelectEvent}
					readonly={true}
					onClose={handleCloseSchedulePopupBox}
					onSave={onCreateSchedule}
					onUpdate={onUpdateSchedule}
					onDelete={onDeleteSchedule}
				></ScheduleInputPopUpBox>
			)}
		</>
	);
}
export default MonthlyCalendar;
