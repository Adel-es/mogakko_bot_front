import PropTypes from "prop-types";
import DailyDetailHeader from "./DailyDetailHeader";
import DailyDetailInfoBody from "./DailyDetailInfoBody";
function DailyDetailInfo({ selectedDay, peopleInfoOfSelectedDay }) {
	return (
		<div>
			<DailyDetailHeader selectedDay={selectedDay}></DailyDetailHeader>
			<DailyDetailInfoBody
				peopleInfoOfSelectedDay={peopleInfoOfSelectedDay}
			></DailyDetailInfoBody>
		</div>
	);
}
DailyDetailInfo.propTypes = {
	selectedDay: PropTypes.instanceOf(Date).isRequired,
	peopleInfoOfSelectedDay: PropTypes.array,
};
export default DailyDetailInfo;
