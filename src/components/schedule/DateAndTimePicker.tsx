import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
	LocalizationProvider,
	DatePicker,
	TimePicker,
} from "@mui/x-date-pickers";
import {
	setYearMonthDate,
	setHourMinute,
} from "../../utils/time/TimeController";
import { compareDesc } from "date-fns";

interface DateAndTimePickerProp {
	date: Date;
	minDate?: Date | undefined;
	onChangeDate: React.Dispatch<React.SetStateAction<Date>>;
}
function DateAndTimePicker({
	date,
	minDate,
	onChangeDate,
}: DateAndTimePickerProp) {
	const handleChangeDate = (value: Date | null) => {
		onChangeDate((current: Date) => setYearMonthDate(current, value!));
	};
	const handleChangeTime = (value: Date | null) => {
		onChangeDate((current: Date) => setHourMinute(current, value!));
	};
	function initDate() {
		// compareDesc : minDate > date => -1
		if (minDate === undefined) return;
		if (compareDesc(minDate, date) < 0) {
			date = setYearMonthDate(date, minDate!);
			onChangeDate(date);
		}
	}
	initDate();
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DatePicker
				// label="날짜"
				value={date}
				minDate={minDate}
				onChange={handleChangeDate}
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
				value={date}
				onChange={handleChangeTime}
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
