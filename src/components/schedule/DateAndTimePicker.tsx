import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
	LocalizationProvider,
	DatePicker,
	TimePicker,
} from "@mui/x-date-pickers";

interface DateAndTimePickerProp {
	date: Date;
	time: Date;
	minDate?: Date | undefined;
	onChangeDate: any;
	onChangeTime: any;
}
function DateAndTimePicker({
	date,
	time,
	minDate,
	onChangeDate,
	onChangeTime,
}: DateAndTimePickerProp) {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DatePicker
				// label="날짜"
				value={date}
				minDate={minDate}
				onChange={onChangeDate}
				renderInput={(params) => (
					<TextField
						{...params}
						variant="standard"
						size="small"
						sx={{
							width: "30%",
							maxWidth: "120px",
							textAlign: "center",
							fontSize: 10,
							mx: 1,
						}}
					/>
				)}
			></DatePicker>
			<TimePicker
				// label="시각"
				value={time}
				onChange={onChangeTime}
				// minutesStep={10}
				disableMaskedInput={true}
				renderInput={(params) => (
					<TextField
						{...params}
						variant="standard"
						size="small"
						sx={{
							width: "30%",
							maxWidth: "120px",
							textAlign: "center",
							fontSize: 10,
							mx: 1,
						}}
					/>
				)}
			/>
		</LocalizationProvider>
	);
}

export default DateAndTimePicker;
