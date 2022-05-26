import TextField from "@mui/material/TextField";
import { List, ListItem, ListItemText } from "@mui/material";
import DateAndTimePicker from "./DateAndTimePicker";
import { Schedule } from "../../utils/schedule/ScheduleInfoStruct";

export interface ScheduleInputProps {
	title?: string;
	startDate: Date;
	endDate: Date;
	content?: string;
}
function ScheduleInputBox({
	title,
	startDate,
	endDate,
	content,
	onSave,
}: {
	title: {
		value: string;
		setValue: React.Dispatch<React.SetStateAction<string>>;
	};
	startDate: {
		value: Date;
		setValue: React.Dispatch<React.SetStateAction<Date>>;
	};
	endDate: {
		value: Date;
		setValue: React.Dispatch<React.SetStateAction<Date>>;
	};
	content: {
		value: string;
		setValue: React.Dispatch<React.SetStateAction<string>>;
	};
	onSave?: (schedule: Schedule) => void;
}) {
	return (
		<List
			sx={{
				width: "100%",
			}}
		>
			<ListItem>
				<TextField
					label="제목"
					placeholder={title.value}
					fullWidth
					onChange={(event: any) => title.setValue(event.target.value)}
				></TextField>
			</ListItem>
			<ListItem>
				<DateAndTimePicker
					date={startDate.value}
					// minDate={new Date()}
					onChangeDate={startDate.setValue}
				></DateAndTimePicker>
				<ListItemText
					primary="~"
					sx={{
						textAlign: "center",
					}}
				></ListItemText>
				<DateAndTimePicker
					date={endDate.value}
					minDate={startDate.value}
					onChangeDate={endDate.setValue}
				></DateAndTimePicker>
			</ListItem>
			<ListItem>
				<TextField
					label="내용"
					multiline
					rows={4}
					placeholder={content.value}
					fullWidth
					onChange={(event: any) => content.setValue(event.target.value)}
				></TextField>
			</ListItem>
		</List>
	);
}

export default ScheduleInputBox;
