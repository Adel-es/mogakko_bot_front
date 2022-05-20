import styled from "styled-components";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import DetailPersonTag from "../persontag/DetailPersonTag";
import { Schedule } from "../../utils/schedule/ScheduleInfoStruct";

function getTimeString(date: Date): string {
	const timeString = format(date, "HH") + ":" + format(date, "mm");
	return timeString;
}

interface DailyDetailInfoBodyProp {
	selectedDay: Date;
	schedulesOfSelectedDay: Array<Schedule>;
	onCreateSchedule: any;
}
function DailyDetailInfoBody({
	selectedDay,
	schedulesOfSelectedDay,
	onCreateSchedule,
}: DailyDetailInfoBodyProp) {
	const [clickedCreateButton, setClickedCreateButton] = useState(false);
	const handleClickCreateScheduleButton = () => {
		setClickedCreateButton((prev) => !prev);
	};
	useEffect(() => {
		setClickedCreateButton(false);
	}, [selectedDay]);

	return (
		<PersonTagAlignCenter>
			{schedulesOfSelectedDay.map((personInfo: Schedule, index: number) => (
				<DetailPersonTag
					key={index} // TODO: index를 나중에 DB에서 id를 받아와서 바꾸기
					name={personInfo.name}
					startTime={getTimeString(personInfo.startTime)}
					endTime={getTimeString(personInfo.endTime)}
				></DetailPersonTag>
			))}
			{/* {clickedCreateButton ? (
        <CreateScheduleBox
          selectedDay={selectedDay}
          onCreateSchedule={onCreateSchedule}
        ></CreateScheduleBox>
      ) : (
        ""
      )}
      <CreateScheduleButton
        onClickCreateScheduleButton={handleClickCreateScheduleButton}
      ></CreateScheduleButton> */}
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
