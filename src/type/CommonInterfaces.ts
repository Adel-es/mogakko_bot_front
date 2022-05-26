export interface Schedule {
	id: number;
	name: string;
	start: Date;
	end: Date;
	title: string;
	content: string;
}

export interface EachDateType {
	date: Date;
	schedules: Set<number>;
}
