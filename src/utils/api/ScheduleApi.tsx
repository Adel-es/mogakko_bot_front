import {
  Schedule,
  ScheduleBody,
  SchedulePostBody,
} from "../../type/CommonInterfaces";

function convertDateToUriFormat(date: Date) {
  let iso = date.toISOString().replace("%3A", ":");
  iso = iso.split(".")[0];
  // console.log(iso);
  return iso;
}

export async function getSchedulesByDuration(
  url: string,
  start: Date,
  end: Date
) {
  const queries =
    "start=" +
    convertDateToUriFormat(start) +
    "&end=" +
    convertDateToUriFormat(end);
  const requestAPI = url + "/schedules?" + queries;
  const response = await fetch(requestAPI).then((response) => response.json());
  // console.log(schedules);
  return response;
}

export async function getSchedulesById(url: string, id: number) {
  const pathParameters = id.toString();
  const requestAPI = url + "/schedules/" + pathParameters;
  const response = await fetch(requestAPI).then((response) => response.json());
  return response;
}

export async function getSchedulesByDurationAndId(
  url: string,
  start: Date,
  end: Date,
  userId: number
) {
  const queries =
    "start=" +
    convertDateToUriFormat(start) +
    "&end=" +
    convertDateToUriFormat(end) +
    "&user_id=" +
    userId.toString();
  const requestAPI = url + "/schedules?" + queries;
  const response = await fetch(requestAPI).then((response) => response.json());
  // console.log(schedules);
  return response;
}

export async function postSchedule(url: string, schedule: ScheduleBody) {
  const body = JSON.stringify({
    user_id: schedule.name,
    start: convertDateToUriFormat(schedule.start),
    end: convertDateToUriFormat(schedule.end),
    title: schedule.title,
    content: schedule.content,
  });
  const requestAPI = url + "/schedules";
  const response = await fetch(requestAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
  return response;
}

export async function updateSchedule(url: string, schedule: Schedule) {
  const pathParameter = schedule.id.toString();
  const body = JSON.stringify({
    start: convertDateToUriFormat(schedule.start),
    end: convertDateToUriFormat(schedule.end),
    title: schedule.title,
    content: schedule.content,
  });
  const requestAPI = url + "/schedules/" + pathParameter;
  const response = await fetch(requestAPI, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: body,
  });
  return response;
}

export async function deleteSchedule(url: string, id: number) {
  const pathParameters = id.toString();
  const requestAPI = url + "/schedules/" + pathParameters;
  const response = await fetch(requestAPI, {
    method: "DELETE",
  });
  return response;
}
