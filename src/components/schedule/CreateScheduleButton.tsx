import styled from "styled-components";
import PropTypes from "prop-types";

function CreateScheduleButton({ onClickCreateScheduleButton } : { onClickCreateScheduleButton : any}) {
	return (
		<CreationButton onClick={onClickCreateScheduleButton}>+</CreationButton>
	);
}

CreateScheduleButton.propTypes = {
	onClickCreateScheduleButton: PropTypes.func.isRequired,
};

const CreationButton = styled.div`
	--button-size: 50px;
	width: var(--button-size);
	height: var(--button-size);
	font-size: calc(var(--button-size) / 2);

	border-radius: calc(var(--button-size) / 2);
	border: 1px solid gray;

	background-color: #e74c3c;
	:hover {
		background-color: #c0392b;
	}
	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);

	// content align
	text-align: center;
	line-height: var(--button-size);

	// this component align from parent
	margin: auto;
`;
export default CreateScheduleButton;
