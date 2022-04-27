function CalendarHeader({ year, month, CallBackEvent }) {
	const onClickLeftButton = () => {
		CallBackEvent({ left: true, right: false });
		console.log("left button");
	};
	const onClickRightButton = () => {
		CallBackEvent({ left: false, right: true });
		console.log("right button");
	};
	return (
		<div>
			<p>{year}</p>
			<button onClick={onClickLeftButton}>&#60;</button>
			<div>{month}</div>
			<button onClick={onClickRightButton}>&#62;</button>
		</div>
	);
}
export default CalendarHeader;
