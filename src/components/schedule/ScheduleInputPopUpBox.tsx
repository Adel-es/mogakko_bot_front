import { Dialog, DialogActions, Button } from "@mui/material";
import { Schedule } from "../../utils/schedule/ScheduleInfoStruct";
import ScheduleInputBox, { ScheduleInputProps } from "./ScheduleInputBox";
import { useState } from "react";

const defaultProps: ScheduleInputProps = {
	title: "(제목 없음)",
	startDate: new Date(),
	endDate: new Date(),
	content: "(내용 없음)",
};

function ScheduleInputPopUpBox({
	defaultContent,
	open,
	onClose,
	onSave,
	onModify,
	onDelete,
}: {
	defaultContent: ScheduleInputProps;
	open: boolean;
	onClose: () => void;
	onSave?: (personInfo: Schedule) => void;
	onModify?: (...props: any | null) => {};
	onDelete?: (...props: any | null) => {};
}) {
	const [title, setTitle] = useState<string>(defaultContent.title!);
	const [startDate, setStartDate] = useState<Date>(defaultContent.startDate);
	const [endDate, setEndDate] = useState<Date>(defaultContent.endDate);
	const [content, setContent] = useState<string>(defaultContent.content!);

	return (
		<Dialog
			open={open}
			onClose={onClose}
			sx={{
				width: "100%",
				minWidth: 800,
				maxWidth: 1000,
			}}
		>
			<ScheduleInputBox
				title={{ value: title, setValue: setTitle }}
				startDate={{ value: startDate, setValue: setStartDate }}
				endDate={{ value: endDate, setValue: setEndDate }}
				content={{ value: content, setValue: setContent }}
			></ScheduleInputBox>
			<DialogActions>
				<Button onClick={onClose}>취소</Button>
				{onSave !== undefined && <Button>저장</Button>}
				{onModify !== undefined && <Button>수정</Button>}
				{onDelete !== undefined && <Button>삭제</Button>}
			</DialogActions>
		</Dialog>
	);
}

ScheduleInputPopUpBox.defaultProps = { defaultContent: defaultProps };

export default ScheduleInputPopUpBox;
