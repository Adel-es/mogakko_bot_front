import {
	Schedule,
	ScheduleInfoStruct,
	samplePeopleInfo,
} from "../utils/schedule/ScheduleInfoStruct";
import { differenceInCalendarDays, addDays } from "date-fns";
import { useState } from "react";
import { GenerateCalendarOfCurrentMonth } from "../utils/calendar/MonthListGenerator";
import { EachDateType } from "../utils/calendar/MonthListGenerator";
import ScheduleInputPopUpBox from "../components/schedule/ScheduleInputPopUpBox";
import MonthlyCalendar from "../components/calendar/MonthlyCalendar";

function mergeCalendarWithSchedule(
	calendarOfCurrentMonth: Map<string, EachDateType>,
	schedulesOfCurrentMonth: Map<number, Schedule>
): Map<string, EachDateType> {
	/**
	 * @returns : 스케쥴 리스트를 병합한 한 달(선택한 월) 날짜 리스트
	 */
	for (let [key, schedule] of schedulesOfCurrentMonth) {
		const schedulePeriod = differenceInCalendarDays(
			schedule.end,
			schedule.start
		);
		const containedDates = [];
		for (let i = 0; i <= schedulePeriod; i++) {
			// console.log(" Plus Date: ", addDays(schedule.start, i).toDateString());
			containedDates.push(addDays(schedule.start, i).toDateString());
		}
		for (const date of containedDates) {
			if (!calendarOfCurrentMonth.has(date)) continue;
			calendarOfCurrentMonth.get(date)!.schedules.add(schedule.id);
		}
	}
	return calendarOfCurrentMonth;
}

export interface ScheduleEvent {
	title: string;
	start: Date;
	end: Date;
	resource: {
		title: string;
		content: string;
	};
}
function getSchedulesOnSelectedDay(
	selectedDay: Date,
	calendarOfCurrentMonth: Map<string, EachDateType>,
	schedulesOfCurrentMonth: Map<number, Schedule>
): Array<ScheduleEvent> {
	/**
	 * @returns : 특정 날짜에 속하는 일정 리스트 (big-calendar의 event 형식)
	 */
	if (!calendarOfCurrentMonth.has(selectedDay.toDateString())) return [];
	// console.log("in func:", selectedDay);
	const idsOfSelectedDay = Array.from(
		calendarOfCurrentMonth.get(selectedDay.toDateString())!.schedules
	);
	const schedulesOfSelectedDay = idsOfSelectedDay.map((id) => {
		const schedule = schedulesOfCurrentMonth.get(id)!;
		return {
			title: schedule.name,
			start: schedule.start,
			end: schedule.end,
			resource: { title: schedule.title, content: schedule.content },
		};
	});

	return schedulesOfSelectedDay;
}

function StudyManager() {
	const [startDateOnCalendar, setStartDateOnCalendar] = useState(new Date());
	const [dayClicked, setDayClicked] = useState(false);
	const [dayDoubleClicked, setDayDoubleClicked] = useState(false);
	const [selectedDay, setSelectedDay] = useState(new Date());
	const [schedulesOfCurrentMonth, setSchedulesOfCurrentMonth] = useState(
		new Map(samplePeopleInfo.map((personInfo) => [personInfo.id, personInfo]))
	);

	/**
	 * calendarOfCurrentMonth 에는 각 day에 schedule의 id를 Set()으로 저장,
	 * schedulesOfCurrentMonth 에는 schedule을 Map(id, {schedule 정보})에 저장.
	 */
	let calendarOfCurrentMonth = mergeCalendarWithSchedule(
		GenerateCalendarOfCurrentMonth(startDateOnCalendar),
		schedulesOfCurrentMonth
	);

	let schedulesOfSelectedDay = getSchedulesOnSelectedDay(
		selectedDay,
		calendarOfCurrentMonth,
		schedulesOfCurrentMonth
	);

	const handleClickDayOnCalendar = ({
		clickedDay,
		clickEvent,
	}: {
		clickedDay: Date;
		clickEvent: any;
	}) => {
		// setDayClicked(true);
		switch (clickEvent.detail) {
			case 1:
				setDayClicked(true);
				break;
			case 2:
				if (selectedDay.toDateString() === clickedDay.toDateString()) {
					setDayDoubleClicked((current) => !current);
				} else {
					setDayDoubleClicked(true);
					setSelectedDay(clickedDay);
					schedulesOfSelectedDay = getSchedulesOnSelectedDay(
						selectedDay,
						calendarOfCurrentMonth,
						schedulesOfCurrentMonth
					);
				}
				break;
		}
	};

	const handleCloseSchedulePopupBox = () => {
		setDayClicked(false);
	};

	const handleActiveStartDateChangeOnMonthlyCalendar = (prop: {
		startDate: Date;
	}) => {
		setStartDateOnCalendar(prop.startDate);
	};

	const getSchedulesOnMovedDayOnDailyCalendar = (
		movedDate: Date
	): Array<ScheduleEvent> => {
		return getSchedulesOnSelectedDay(
			movedDate,
			calendarOfCurrentMonth,
			schedulesOfCurrentMonth
		);
	};

	// TODO: create가 안됨.
	const handleCreateSchedule = (personInfo: Schedule) => {
		const tempId = schedulesOfCurrentMonth.size + 1;
		setSchedulesOfCurrentMonth((prev) => new Map(prev).set(tempId, personInfo));
	};
	// console.log("Study Manager render");
	// console.log("schedulesOfCurrentMonth: ", schedulesOfCurrentMonth);
	// console.log("schedulesOfSelectedDay: ", schedulesOfSelectedDay);

	// TODO: samplePeopleInfo가 Calendar에 바로 반영이 되지 않고 있음
	// TODO: 다른 day를 클릭했을 때, create box가 사라지지 않음. 아예 detail view를 없애고 난 후, 다시 열어보면  create box가 사라져있음.
	return (
		<div>
			<MonthlyCalendar
				calendarOfCurrentMonth={calendarOfCurrentMonth}
				schedulesOfCurrentMonth={schedulesOfCurrentMonth}
				onClickDayOnCalendar={handleClickDayOnCalendar}
				onActiveStartDateChangeOnCalendar={
					handleActiveStartDateChangeOnMonthlyCalendar
				}
			></MonthlyCalendar>
			{/* <ScheduleInputPopUpBox
				defaultContent={{ startDate: selectedDay, endDate: selectedDay }}
				onOpen={dayClicked}
				onClose={handleCloseSchedulePopupBox}
			></ScheduleInputPopUpBox> */}
		</div>
	);
}
export default StudyManager;
