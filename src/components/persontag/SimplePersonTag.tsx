import styled from "styled-components";
function SimplePersonTag({ name } : {name: string}) {
	return <Tag>{name}</Tag>;
}
const Tag = styled.div`
	--font-size: 12px;
	font-size: var(--font-size);
	color: black;

	min-width: 20%;
	max-width: 80%;
	min-height: var(--font-size);
	// max-height: 80%;

	background-color: lightpink;
	border-radius: 5px;
`;
export default SimplePersonTag;
