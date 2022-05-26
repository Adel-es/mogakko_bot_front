import TextField from "@mui/material/TextField";
import { List, ListItem, ListItemText } from "@mui/material";
import DateAndTimePicker from "./DateAndTimePicker";
import { Schedule } from "../../utils/schedule/ScheduleInfoStruct";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)(() => ({
	/** disable 시, 글자 색상 설정 */
	".MuiInputBase-input.Mui-disabled": {
		WebkitTextFillColor: "black",
	},
}));

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
	readonly,
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
	readonly: boolean;
	onSave?: (schedule: Schedule) => void;
}) {
	const defaultTitle = "(제목 없음)";
	const defaultContent = "(내용 없음)";
	return (
		<List
			sx={{
				width: "100%",
			}}
		>
			<ListItem>
				<CustomTextField
					label="제목"
					placeholder={defaultTitle}
					value={title.value}
					fullWidth
					onChange={(event: any) => title.setValue(event.target.value)}
					disabled={readonly}
				></CustomTextField>
			</ListItem>
			<ListItem>
				<DateAndTimePicker
					date={startDate.value}
					onChangeDate={startDate.setValue}
					readonly={readonly}
				></DateAndTimePicker>
				<ListItemText primary="~"></ListItemText>
				<DateAndTimePicker
					date={endDate.value}
					minDate={startDate.value}
					onChangeDate={endDate.setValue}
					readonly={readonly}
				></DateAndTimePicker>
			</ListItem>
			<ListItem>
				<CustomTextField
					label="내용"
					multiline
					rows={4}
					value={content.value}
					placeholder={defaultContent}
					fullWidth
					onChange={(event: any) => content.setValue(event.target.value)}
					disabled={readonly}
				></CustomTextField>
			</ListItem>
		</List>
	);
}

export default ScheduleInputBox;
