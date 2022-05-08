import PropTypes from "prop-types";
import DailyDetailHeader from "./DailyDetailHeader";
import DailyDetailInfoBody from "./DailyDetailInfoBody";
function DailyDetailInfo({
	selectedDay,
	schedulesOfSelectedDay,
	onCreateSchedule,
}) {
	return (
		<div>
			<DailyDetailHeader selectedDay={selectedDay}></DailyDetailHeader>
			<DailyDetailInfoBody
				selectedDay={selectedDay}
				schedulesOfSelectedDay={schedulesOfSelectedDay}
				onCreateSchedule={onCreateSchedule}
			></DailyDetailInfoBody>
		</div>
	);
}
DailyDetailInfo.propTypes = {
	selectedDay: PropTypes.instanceOf(Date).isRequired,
	schedulesOfSelectedDay: PropTypes.array,
	onCreateSchedule: PropTypes.func.isRequired,
};
export default DailyDetailInfo;
