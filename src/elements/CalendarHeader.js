function CalendarHeader({ year, month }) {
	return (
		<div>
			<p>{year}</p>
			<button>&#60;</button>
			<div>{month}</div>
			<button>&#62;</button>
		</div>
	);
}
export default CalendarHeader;
