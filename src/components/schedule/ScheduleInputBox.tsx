import { useState } from "react";
import TextField from "@mui/material/TextField";
import { List, ListItem, ListItemText } from "@mui/material";
import DateAndTimePicker from "./DateAndTimePicker";

export interface ScheduleInputProps {
	title?: string;
	startDate: Date;
	endDate: Date;
	content?: string;
}

const defaultProps: ScheduleInputProps = {
	title: "(제목 없음)",
	startDate: new Date(),
	endDate: new Date(),
	content: "(내용 없음)",
};

function ScheduleInputBox({
	defaultContent,
}: {
	defaultContent: ScheduleInputProps;
}) {
	const [title, setTitle] = useState(defaultContent.title);
	const [startDate, setStartDate] = useState<Date | null>(
		defaultContent.startDate
	);
	const [startTime, setStartTime] = useState<Date | null>(
		defaultContent.startDate
	);
	const [endDate, setEndDate] = useState<Date | null>(defaultContent.endDate);
	const [endTime, setEndTime] = useState<Date | null>(defaultContent.endDate);
	const [content, setContent] = useState(defaultContent.content);

	const handleChange = (date: Date) => {
		setStartDate(date);
	};
	return (
		<List
			sx={{
				width: "100%",
			}}
		>
			<ListItem>
				<TextField
					label="제목"
					placeholder={title}
					fullWidth
					onChange={(event: any) => setTitle(event.target.value)}
				></TextField>
			</ListItem>
			<ListItem>
				<DateAndTimePicker
					date={startDate}
					time={startTime}
					minDate={new Date()}
					onChangeDate={setStartDate}
					onChangeTime={setStartTime}
				></DateAndTimePicker>
				<ListItemText
					primary="~"
					sx={{
						textAlign: "center",
					}}
				></ListItemText>
				<DateAndTimePicker
					date={endDate}
					time={endTime}
					minDate={startDate}
					onChangeDate={setEndDate}
					onChangeTime={setEndTime}
				></DateAndTimePicker>
			</ListItem>
			<ListItem>
				<TextField
					label="내용"
					multiline
					rows={4}
					placeholder={content}
					fullWidth
					onChange={(event: any) => setContent(event.target.value)}
				></TextField>
			</ListItem>
		</List>
	);
}

ScheduleInputBox.defaultProps = { defaultContent: defaultProps };

export default ScheduleInputBox;
