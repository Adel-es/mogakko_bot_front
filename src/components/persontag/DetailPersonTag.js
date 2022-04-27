import styled from "styled-components";
function DetailPersonTag({ name, startTime, endTime }) {
	return (
		<Tag>
			<TagName>{name}</TagName>
			<VerticalSeparatorLine></VerticalSeparatorLine>
			<TagContentAlign>
				<TagContent>시작</TagContent>
				<TagContent>{startTime}</TagContent>
			</TagContentAlign>
			<HorizontalSeparatorLine>-</HorizontalSeparatorLine>
			<TagContentAlign>
				<TagContent>종료</TagContent>
				<TagContent>{endTime}</TagContent>
			</TagContentAlign>
		</Tag>
	);
}
const tagFontSize = `12px`;
const Tag = styled.div`
	width: 70%;
	min-width: 300px;
	max-width: 500px;
	min-height: 30px;

	border: 1px solid lightgray;
	border-radius: 5px;
	background-color: #fff8f2;
	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);

	margin: auto;
	margin-top: 20px;
	margin-bottom: 20px;

	display: flex; // Tag Content align center
	align-items: stretch;
`;
const TagName = styled.div`
	width: 40%;
	text-align: center;
	font-size: ${tagFontSize};
	word-break: break-all;
`;

const VerticalSeparatorLine = styled.div`
	// height: 100%;
	// min-height: inherit;
	border-left: 1px solid lightgray;
	display: flex;
`;
const TagContentAlign = styled.div`
	width: 25%;
	margin: auto;
	display: flex;
`;
const TagContent = styled.div`
	font-size: ${tagFontSize};
	margin: auto;
	text-align: center;
	vertical-align: middle;
`;
const HorizontalSeparatorLine = styled.div`
	// width: 10%;
	text-align: center;
	vertical-align: middle;
`;
export default DetailPersonTag;
