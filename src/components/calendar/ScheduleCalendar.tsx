import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Schedule } from "../../type/CommonInterfaces";
import { useState, useCallback, useRef, useContext, useEffect } from "react";
import ScheduleInputPopUpBox from "../schedule/ScheduleInputPopUpBox";
import { Context, State } from "../../index";
import {
  deleteSchedule,
  getSchedulesByDuration,
  getSchedulesById,
  postSchedule,
  updateSchedule,
} from "../../utils/api/ScheduleApi";
import { getStartAndEndDate } from "../../utils/calendar/CalendarUtils";

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

interface ScheduleCalendarProp {
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
function ScheduleCalendar({
  schedulesOfCurrentMonth,
  onCreateSchedule,
  onUpdateSchedule,
  onDeleteSchedule,
}: ScheduleCalendarProp) {
  const [isSelectSlot, setIsSelectSlot] = useState<boolean>(false);
  const [isSelectEvent, setIsSelectEvent] = useState<boolean>(false);
  const [startDay, setStartDay] = useState<Date>(new Date());
  const [endDay, setEndDay] = useState<Date>(new Date());
  const defaultPropForScheduleBox = useRef<Schedule>(getDefaultSchedule());
  const { url }: State = useContext(Context);
  useEffect(() => {
    //test
    const getByDur = getSchedulesByDuration(
      url,
      new Date("2022-04-15T09:00:00"),
      new Date("2022-04-30T09:00:00")
    );
    console.log(getByDur);
    // const postResult = postSchedule(url, {
    //   start: new Date("2022-04-09T09:00:00"),
    //   end: new Date("2022-04-09T18:00:00"),
    //   name: "roonm813",
    //   title: "this is title",
    //   content: "this is content",
    // });
    // console.log(postResult);
    // const getById = getSchedulesById(url, 1);
    // console.log(getById);
    // const updateResponse = updateSchedule(url, {
    //   id: 1,
    //   start: new Date("2022-04-09T09:00:00"),
    //   end: new Date("2022-04-09T18:00:00"),
    //   name: "roonm813",
    //   title: "this is title",
    //   content: "this is content",
    // });
    // console.log(updateResponse);
    // const deleteResponse = deleteSchedule(url, 1);
    // console.log(deleteResponse);
  }, []);

  useEffect(() => {
    const response = getSchedulesByDuration(url, startDay, endDay); // userId
    // defaultPropForScheduleBox.current =
  }, [startDay, endDay]);

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

  const handleNavigate = (date: Date, view: View) => {
    // console.log("navigate: ", date.toDateString());
    // console.log(getStartAndEndDate(date, view));
    const { start, end } = getStartAndEndDate(date, view);
    setStartDay(start!);
    setEndDay(end!);
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
        onNavigate={handleNavigate}
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
export default ScheduleCalendar;
