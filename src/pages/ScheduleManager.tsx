import { samplePeopleInfo } from "../utils/schedule/ScheduleInfoStruct";
import { Schedule } from "../type/CommonInterfaces";
import { useState, useRef } from "react";
import MonthlyCalendar from "../components/calendar/MonthlyCalendar";

function StudyManager() {
	const [schedulesOfCurrentMonth, setSchedulesOfCurrentMonth] = useState(
		new Map(samplePeopleInfo.map((personInfo) => [personInfo.id, personInfo]))
	);
	// FIXME: temp code
	const tempId = useRef<number>(schedulesOfCurrentMonth.size);

	const handleCreateSchedule = (personInfo: Schedule) => {
		// FIXME: temp code
		tempId.current += 1;
		personInfo.id = tempId.current;
		console.log(personInfo);

		setSchedulesOfCurrentMonth((prev) =>
			new Map(prev).set(personInfo.id, personInfo)
		);
	};

	const handleUpdateSchedule = (schedule: Schedule) => {
		setSchedulesOfCurrentMonth((prev) =>
			new Map(prev).set(schedule.id, schedule)
		);
	};

	const handleDeleteSchedule = (schedule: Schedule) => {
		setSchedulesOfCurrentMonth((prev) => {
			const newMap = new Map(prev);
			newMap.delete(schedule.id);
			return newMap;
		});
	};

	return (
		<div>
			<MonthlyCalendar
				schedulesOfCurrentMonth={schedulesOfCurrentMonth}
				onCreateSchedule={handleCreateSchedule}
				onUpdateSchedule={handleUpdateSchedule}
				onDeleteSchedule={handleDeleteSchedule}
			></MonthlyCalendar>
		</div>
	);
}
export default StudyManager;
