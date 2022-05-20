import { Dialog, DialogActions, Button } from "@mui/material";
import { Schedule } from "../../utils/schedule/ScheduleInfoStruct";
import ScheduleInputBox, { ScheduleInputProps } from "./ScheduleInputBox";

function ScheduleInputPopUpBox({
	defaultContent,
	onOpen,
	onClose,
	onSave,
}: {
	defaultContent: ScheduleInputProps;
	onOpen: any;
	onClose: any;
	onSave?: (personInfo: Schedule) => {};
}) {
	return (
		<Dialog
			open={onOpen}
			onClose={onClose}
			sx={{
				width: "100%",
				minWidth: 800,
				maxWidth: 1000,
			}}
		>
			<ScheduleInputBox defaultContent={defaultContent}></ScheduleInputBox>
			<DialogActions>
				<Button onClick={onClose}>취소</Button>
				<Button>저장</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ScheduleInputPopUpBox;
