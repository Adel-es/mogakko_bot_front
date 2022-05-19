import { format } from "date-fns";
import styled from "styled-components";
function DailyDetailHeader({ selectedDay }) {
	const getYear = format(selectedDay, "yyyy");
	const getMonth = format(selectedDay, "MM");
	const getDay = format(selectedDay, "dd");
	return (
		<AlignCenter>
			<DateAlignCenter>
				<Date>{getYear}</Date>
				<Date>/</Date>
				<Date>{getMonth}</Date>
				<Date>/</Date>
				<Date>{getDay}</Date>
			</DateAlignCenter>
			<HorizontalSeperatorLine></HorizontalSeperatorLine>
		</AlignCenter>
	);
}
const AlignCenter = styled.div`
	width: 100%;
	text-align: center;
`;
const DateAlignCenter = styled.div`
	width: 100%;
	text-align: center;
`;
const Date = styled.div`
	display: inline-block;
`;
const HorizontalSeperatorLine = styled.div`
	width: 80%;
	border: 1px solid gray;
	display: inline-block;
`;
export default DailyDetailHeader;
