import styled from "styled-components";
function SimplePersonTag({ name }) {
	return <Tag>{name}</Tag>;
}
const Tag = styled.div`
	min-width: 200px;
	max-width: 80%;
	min-height: 30px;
	max-height: 80%;

	border-radius: 5px;
`;
export default SimplePersonTag;
