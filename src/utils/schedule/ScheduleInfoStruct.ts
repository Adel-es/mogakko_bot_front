//TODO: class 로 변경하기
// TODO: typescript 적용하기
//  name: string, startTime: Date(), endTime: Date()
interface Schedule {
  id: number;
  name: string;
  startTime: Date;
  endTime: Date;
  title: string;
  content: string;
}
function ScheduleInfoStruct(
  id: number,
  name: string,
  startTime: Date,
  endTime: Date,
  title: string,
  content: string
): Schedule {
  return {
    id: id,
    name: name,
    startTime: startTime,
    endTime: endTime,
    title: title,
    content: content,
  };
}

export { Schedule, ScheduleInfoStruct };
