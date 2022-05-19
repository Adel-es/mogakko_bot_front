import PropTypes from "prop-types";
import { Schedule } from "../../utils/schedule/ScheduleInfoStruct";
import DailyDetailHeader from "./DailyDetailHeader";
import DailyDetailInfoBody from "./DailyDetailInfoBody";


interface DailyDetailInfoProp{
	selectedDay : Date,
	schedulesOfSelectedDay : Array<Schedule>,
	onCreateSchedule : any,
}
function DailyDetailInfo({
	selectedDay,
	schedulesOfSelectedDay,
	onCreateSchedule,
} : DailyDetailInfoProp) {
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
