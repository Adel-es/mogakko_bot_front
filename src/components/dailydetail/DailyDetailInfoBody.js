import styled from "styled-components";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { useState } from "react";
import CreateScheduleButton from "../schedule/CreateScheduleButton";
import CreateScheduleBox from "../schedule/CreateScheduleBox";
import DetailPersonTag from "../persontag/DetailPersonTag";

function getTimeString(date) {
	const timeString = format(date, "HH") + ":" + format(date, "mm");
	return timeString;
}

function DailyDetailInfoBody({
	selectedDay,
	schedulesOfSelectedDay,
	onCreateSchedule,
}) {
	const [clickedCreateButton, setClickedCreateButton] = useState(false);
	const handleClickCreateScheduleButton = (clicked) => {
		setClickedCreateButton(clicked);
	};

	return (
		<PersonTagAlignCenter>
			{schedulesOfSelectedDay.map((personInfo, index) => (
				<DetailPersonTag
					key={index} // TODO: index를 나중에 DB에서 id를 받아와서 바꾸기
					name={personInfo.name}
					startTime={getTimeString(personInfo.startTime)}
					endTime={getTimeString(personInfo.endTime)}
				></DetailPersonTag>
			))}
			{clickedCreateButton ? (
				<CreateScheduleBox
					selectedDay={selectedDay}
					onCreateSchedule={onCreateSchedule}
				></CreateScheduleBox>
			) : (
				""
			)}
			<CreateScheduleButton
				onClickCreateScheduleButton={handleClickCreateScheduleButton}
			></CreateScheduleButton>
		</PersonTagAlignCenter>
	);
}
DailyDetailInfoBody.propTypes = {
	selectedDay: PropTypes.instanceOf(Date).isRequired,
	schedulesOfSelectedDay: PropTypes.array,
	onCreateSchedule: PropTypes.func.isRequired,
};
const PersonTagAlignCenter = styled.div`
	width: 100%;
	// text-align: center;
	// display: flex;
	// align-items: middle;
`;
export default DailyDetailInfoBody;
