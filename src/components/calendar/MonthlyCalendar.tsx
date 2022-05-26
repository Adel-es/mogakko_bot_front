import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Schedule } from "../../utils/schedule/ScheduleInfoStruct";
import { EachDateType } from "../../utils/calendar/MonthListGenerator";
import { useState, useCallback } from "react";
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
	onCreateSchedule: any;
}
function MonthlyCalendar({
	calendarOfCurrentMonth,
	schedulesOfCurrentMonth,
	onCreateSchedule,
}: MonthlyCalendarProp) {
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [selected, setSelected] = useState<boolean>(false);
	const onSelectSlot = useCallback((slotInfo: any) => {
		setSelectedDate(slotInfo.slots[0]);
		setSelected(true);

		console.log(selectedDate);
	}, []);

	const handleCloseSchedulePopupBox = () => {
		setSelected(false);
	};

	return (
		<>
			<Calendar
				localizer={localizer}
				startAccessor="start"
				endAccessor="end"
				style={{ minWidth: 600, height: 800 }}
				events={Array.from(schedulesOfCurrentMonth.values())}
				titleAccessor={"name"}
				onSelectSlot={onSelectSlot}
				selectable
				views={["month", "day", "agenda"]}
				popup
			></Calendar>
			{selected && (
				<ScheduleInputPopUpBox
					defaultContent={{ startDate: selectedDate, endDate: selectedDate }}
					open={selected}
					onClose={handleCloseSchedulePopupBox}
					onSave={onCreateSchedule}
				></ScheduleInputPopUpBox>
			)}
		</>
	);
}
export default MonthlyCalendar;
