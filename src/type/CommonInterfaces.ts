export interface ScheduleBody {
  name: string;
  start: Date;
  end: Date;
  title: string;
  content: string;
}
export interface Schedule extends ScheduleBody {
  id: number;
}
export interface SchedulePostBody {
  name: string;
  start: string;
  end: string;
  title: string;
  content: string;
}

export interface EachDateType {
  date: Date;
  schedules: Set<number>;
}
