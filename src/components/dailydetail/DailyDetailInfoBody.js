import styled from "styled-components";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { useState } from "react";
import PlanCreateButton from "../plan/PlanCreateButton";
import DetailPersonTag from "../persontag/DetailPersonTag";
import PlanWritingBox from "../plan/PlanWritingBox";

function DailyDetailInfoBody({ peopleInfoOfSelectedDay }) {
	const [clickedCreateButton, setClickedCreateButton] = useState(false);
	const clickedCreateButtonCallBack = (clicked) => {
		setClickedCreateButton(clicked);
	};
	function getTimeString(date) {
		const timeString = format(date, "HH") + ":" + format(date, "mm");
		return timeString;
	}
	return (
		<PersonTagAlignCenter>
			{peopleInfoOfSelectedDay.map((personInfo, index) => (
				<DetailPersonTag
					key={index} // TODO: index를 나중에 DB에서 id를 받아와서 바꾸기
					name={personInfo.name}
					startTime={getTimeString(personInfo.startTime)}
					endTime={getTimeString(personInfo.endTime)}
				></DetailPersonTag>
			))}
			{clickedCreateButton ? <PlanWritingBox></PlanWritingBox> : ""}
			<PlanCreateButton
				clickedCallBack={clickedCreateButtonCallBack}
			></PlanCreateButton>
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
