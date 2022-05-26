import { Dialog, DialogActions, Button } from "@mui/material";
import { Schedule } from "../../utils/schedule/ScheduleInfoStruct";
import ScheduleInputBox, { ScheduleInputProps } from "./ScheduleInputBox";
import { useState } from "react";

function ScheduleInputPopUpBox({
	defaultSchedule,
	open,
	readonly = false,
	onClose,
	onSave,
	onModify,
	onDelete,
}: {
	defaultSchedule: ScheduleInputProps;
	open: boolean;
	readonly?: boolean;
	onClose: () => void;
	onSave?: (personInfo: Schedule) => void;
	onModify?: (...props: any | null) => {};
	onDelete?: (...props: any | null) => {};
}) {
	const defaultTitle = "";
	const defaultContent = "";

	const [title, setTitle] = useState<string>(
		defaultSchedule.title !== undefined ? defaultSchedule.title : defaultTitle
	);
	const [startDate, setStartDate] = useState<Date>(defaultSchedule.startDate);
	const [endDate, setEndDate] = useState<Date>(defaultSchedule.endDate);
	const [content, setContent] = useState<string>(
		defaultSchedule.content !== undefined
			? defaultSchedule.content
			: defaultContent
	);

	const handleSave = () => {
		if (onSave === undefined)
			console.error("onSave() is undefined but need to function.");

		const newSchedule: Schedule = {
			id: 1,
			name: "test name", // FIXME: 사용자 닉네임 가져오기
			start: startDate,
			end: endDate,
			title: title === "" ? defaultTitle : title,
			content: content === "" ? defaultContent : content,
		};
		// console.log(newSchedule);
		onSave!(newSchedule);
		onClose();
	};

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
				readonly={readonly}
			></ScheduleInputBox>
			<DialogActions>
				<Button onClick={onClose}>취소</Button>
				{onSave !== undefined && <Button onClick={handleSave}>저장</Button>}
				{onModify !== undefined && <Button>수정</Button>}
				{onDelete !== undefined && <Button>삭제</Button>}
			</DialogActions>
		</Dialog>
	);
}

export default ScheduleInputPopUpBox;
