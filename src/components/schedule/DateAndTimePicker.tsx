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
import { styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)(() => ({
	/** disable 시, 글자 색상 설정 */
	".MuiInputBase-input.Mui-disabled": {
		WebkitTextFillColor: "black",
	},
	input: {
		textAlign: "center",
		fontSize: 15,
	},
}));

interface DateAndTimePickerProp {
	date: Date;
	minDate?: Date | undefined;
	readonly: boolean;
	onChangeDate: React.Dispatch<React.SetStateAction<Date>>;
}
function DateAndTimePicker({
	date,
	minDate,
	readonly,
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
				mask={""}
				value={date}
				minDate={minDate}
				onChange={handleChangeDate}
				disabled={readonly}
				disableOpenPicker={readonly}
				renderInput={(params) => (
					<CustomTextField
						{...params}
						variant="standard"
						size="small"
						sx={{
							width: "30%",
							maxWidth: "120px",
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
				disabled={readonly}
				disableOpenPicker={readonly}
				renderInput={(params) => (
					<CustomTextField
						{...params}
						variant="standard"
						size="small"
						sx={{
							width: "30%",
							maxWidth: "120px",
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
