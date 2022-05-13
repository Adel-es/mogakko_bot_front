const CalendarDaysOfWeek = () => {
	const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return (
		<tr>
			{daysOfTheWeek.map((dayOfTheWeek) => (
				<th key={dayOfTheWeek}>{dayOfTheWeek}</th>
			))}
		</tr>
	);
};
export default CalendarDaysOfWeek;
