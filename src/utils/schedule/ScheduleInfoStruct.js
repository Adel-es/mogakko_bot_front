//TODO: class 로 변경하기
// TODO: typescript 적용하기
//  name: string, startTime: Date(), endTime: Date()
function ScheduleInfoStruct(_name, _startTime, _endTime) {
	return {
		name: _name,
		startTime: _startTime,
		endTime: _endTime,
	};
}

export default ScheduleInfoStruct;
