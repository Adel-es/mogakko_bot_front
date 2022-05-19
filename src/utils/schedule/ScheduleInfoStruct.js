//TODO: class 로 변경하기
// TODO: typescript 적용하기
//  name: string, startTime: Date(), endTime: Date()
function ScheduleInfoStruct(id, name, startTime, endTime, title, description) {
	return {
		id: id,
		name: name,
		startTime: startTime,
		endTime: endTime,
		title: title,
		description: description,
	};
}

export default ScheduleInfoStruct;
