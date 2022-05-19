import { format } from "date-fns";

function CalendarHeader({ currentCalendarDate, onMoveCalendarMonth }) {
	const getYear = (day) => {
		return format(day, "yyyy");
	};
	const getMonth = (day) => {
		return format(day, "MMMM");
	};
	const onClickLeftButton = () => {
		onMoveCalendarMonth({ left: true, right: false });
		console.log("left button");
	};
	const onClickRightButton = () => {
		onMoveCalendarMonth({ left: false, right: true });
		console.log("right button");
	};
	return (
		<div>
			<p>{getYear(currentCalendarDate)}</p>
			<button onClick={onClickLeftButton}>&#60;</button>
			<div>{getMonth(currentCalendarDate)}</div>
			<button onClick={onClickRightButton}>&#62;</button>
		</div>
	);
}
export default CalendarHeader;
