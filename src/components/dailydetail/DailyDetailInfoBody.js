import DetailPersonTag from "../persontag/DetailPersonTag";
import styled from "styled-components";
import PropTypes from "prop-types";
import { format } from "date-fns";
function DailyDetailInfoBody({ peopleInfoOfSelectedDay }) {
	function getTimeString(date) {
		const timeString = format(date, "HH") + ":" + format(date, "mm");
		return timeString;
	}
	return (
		<PersonTagAlignCenter>
			{peopleInfoOfSelectedDay.map((personInfo) => (
				<DetailPersonTag
					name={personInfo.name}
					startTime={getTimeString(personInfo.startTime)}
					endTime={getTimeString(personInfo.endTime)}
				></DetailPersonTag>
			))}
			<DetailPersonTag
				name="테스트이름222222222222222222222222ㅁㄴ어라ㅣㅘ노히ㅏㅗㅓㅏㅚㅓㅏ"
				startTime="11:00"
				endTime="12:00"
			></DetailPersonTag>
		</PersonTagAlignCenter>
	);
}
DailyDetailInfoBody.propTypes = {
	peopleInfoOfSelectedDay: PropTypes.array,
};
const PersonTagAlignCenter = styled.div`
	width: 100%;
	// text-align: center;
	// display: flex;
	// align-items: middle;
`;
export default DailyDetailInfoBody;
