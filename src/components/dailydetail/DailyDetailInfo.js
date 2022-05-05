import PropTypes from "prop-types";
import DailyDetailHeader from "./DailyDetailHeader";
import DailyDetailInfoBody from "./DailyDetailInfoBody";
function DailyDetailInfo({
	selectedDay,
	peopleInfoOfSelectedDay,
	createNewScheduleCallBack,
}) {
	return (
		<div>
			<DailyDetailHeader selectedDay={selectedDay}></DailyDetailHeader>
			<DailyDetailInfoBody
				peopleInfoOfSelectedDay={peopleInfoOfSelectedDay}
				createNewScheduleCallBack={createNewScheduleCallBack}
			></DailyDetailInfoBody>
		</div>
	);
}
DailyDetailInfo.propTypes = {
	selectedDay: PropTypes.instanceOf(Date).isRequired,
	peopleInfoOfSelectedDay: PropTypes.array,
	createNewPlanCallBack: PropTypes.func.isRequired,
};
export default DailyDetailInfo;
