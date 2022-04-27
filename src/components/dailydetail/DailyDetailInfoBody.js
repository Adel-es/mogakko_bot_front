import DetailPersonTag from "../persontag/DetailPersonTag";
import styled from "styled-components";
function DailyDetailInfoBody() {
	return (
		<PersonTagAlignCenter>
			<DetailPersonTag
				name="테스트이름"
				startTime="11:00"
				endTime="12:00"
			></DetailPersonTag>
			<DetailPersonTag
				name="테스트이름222222222222222222222222ㅁㄴ어라ㅣㅘ노히ㅏㅗㅓㅏㅚㅓㅏ"
				startTime="11:00"
				endTime="12:00"
			></DetailPersonTag>
		</PersonTagAlignCenter>
	);
}
const PersonTagAlignCenter = styled.div`
	width: 100%;
	// text-align: center;
	// display: flex;
	// align-items: middle;
`;
export default DailyDetailInfoBody;
