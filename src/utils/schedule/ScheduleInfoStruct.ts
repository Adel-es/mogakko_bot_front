//TODO: class 로 변경하기
// TODO: typescript 적용하기
//  name: string, startTime: Date(), endTime: Date()

import { Schedule } from "../../type/CommonInterfaces";

function ScheduleInfoStruct(
	id: number,
	name: string,
	start: Date,
	end: Date,
	title: string,
	content: string
): Schedule {
	return {
		id: id,
		name: name,
		start: start,
		end: end,
		title: title,
		content: content,
	};
}

export const samplePeopleInfo = [
	ScheduleInfoStruct(
		1,
		"정채ㅜ언",
		new Date(2022, 6, 30, 11, 0),
		new Date(2022, 6, 30, 12, 0),
		"test title",
		"test description"
	),
	ScheduleInfoStruct(
		2,
		"윤승ㅎ희",
		new Date(2022, 6, 26, 11, 0),
		new Date(2022, 6, 27, 12, 0),
		"test title2",
		"test description2"
	),
	ScheduleInfoStruct(
		3,
		"고선아ㅣ",
		new Date(2022, 6, 27, 22, 0),
		new Date(2022, 6, 28, 1, 0),
		"test title3",
		"test descipriont3"
	),
	ScheduleInfoStruct(
		4,
		"쥰내내내내ㅐ내내ㅐ긴이름TooLooooooooooooooong",
		new Date(2022, 6, 27, 22, 0),
		new Date(2022, 6, 28, 12, 0),
		"test title4",
		"test description4"
	),
	ScheduleInfoStruct(
		5,
		"정채ㅜ언1",
		new Date(2022, 6, 30, 11, 0),
		new Date(2022, 6, 30, 12, 30),
		"test title",
		"test description"
	),
	ScheduleInfoStruct(
		6,
		"정채ㅜ언2",
		new Date(2022, 6, 30, 13, 0),
		new Date(2022, 6, 30, 16, 0),
		"test title",
		"test description"
	),
	ScheduleInfoStruct(
		7,
		"정채ㅜ언2",
		new Date(2022, 6, 30, 13, 0),
		new Date(2022, 6, 30, 16, 0),
		"test title",
		"test description"
	),
	ScheduleInfoStruct(
		8,
		"정채ㅜ언2",
		new Date(2022, 6, 30, 13, 0),
		new Date(2022, 6, 30, 16, 0),
		"test title",
		"test description"
	),
	ScheduleInfoStruct(
		9,
		"정채ㅜ언2",
		new Date(2022, 6, 30, 13, 0),
		new Date(2022, 6, 30, 16, 0),
		"test title",
		"test description"
	),
];
