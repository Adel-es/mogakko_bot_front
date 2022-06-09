import { samplePeopleInfo } from "../utils/schedule/ScheduleInfoStruct";
import { Schedule } from "../type/CommonInterfaces";
import { useState, useRef, useContext } from "react";
import ScheduleCalendar from "../components/calendar/ScheduleCalendar";
import { getSchedulesByDuration } from "../utils/api/ScheduleAPI";
import { Context, State } from "..";

function StudyManager() {
	const [schedulesOfCurrentMonth, setSchedulesOfCurrentMonth] = useState(
		new Map(samplePeopleInfo.map((personInfo) => [personInfo.id, personInfo]))
	);
	const { url }: State = useContext(Context);
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

	const handleMoveDate = (startDay: Date, endDay: Date) => {
		getSchedulesByDuration(url, startDay, endDay).then((response) => {
			console.log(Array(response.json()));
			// console.log(new Map());
			// setSchedulesOfCurrentMonth(new Map())
		});
	};
	return (
		<div>
			<ScheduleCalendar
				schedulesOfCurrentMonth={schedulesOfCurrentMonth}
				onCreateSchedule={handleCreateSchedule}
				onUpdateSchedule={handleUpdateSchedule}
				onDeleteSchedule={handleDeleteSchedule}
				onMoveDate={handleMoveDate}
			></ScheduleCalendar>
		</div>
	);
}
export default StudyManager;
