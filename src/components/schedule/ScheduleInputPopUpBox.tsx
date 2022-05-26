import { Dialog, DialogActions, Button } from "@mui/material";
import { Schedule } from "../../utils/schedule/ScheduleInfoStruct";
import ScheduleInputBox from "./ScheduleInputBox";
import { useState, useEffect } from "react";

function ScheduleInputPopUpBox({
	defaultSchedule,
	open,
	readonly,
	onClose,
	onSave,
	onUpdate,
	onDelete,
}: {
	defaultSchedule: Schedule;
	open: boolean;
	readonly: boolean;
	onClose: () => void;
	onSave: (personInfo: Schedule) => void;
	onUpdate: (personInfo: Schedule) => void;
	onDelete: (personInfo: Schedule) => void;
}) {
	const defaultTitle = "";
	const defaultContent = "";

	const [title, setTitle] = useState<string>(
		defaultSchedule.title !== undefined ? defaultSchedule.title : defaultTitle
	);
	const [startDate, setStartDate] = useState<Date>(defaultSchedule.start);
	const [endDate, setEndDate] = useState<Date>(defaultSchedule.end);
	const [content, setContent] = useState<string>(
		defaultSchedule.content !== undefined
			? defaultSchedule.content
			: defaultContent
	);
	const [isReadOnly, setIsReadOnly] = useState<boolean>(readonly);

	useEffect(() => {
		setIsReadOnly(readonly);
	}, [readonly]);

	const handleClickUpdateButton = () => {
		setIsReadOnly(false);
	};

	const handleSave = () => {
		const newSchedule: Schedule = {
			id: defaultSchedule.id,
			name: defaultSchedule.name,
			start: startDate,
			end: endDate,
			title: title === "" ? defaultTitle : title,
			content: content === "" ? defaultContent : content,
		};

		onSave(newSchedule);
		onClose();
	};

	const handleUpdate = () => {
		const newSchedule: Schedule = {
			id: defaultSchedule.id,
			name: defaultSchedule.name,
			start: startDate,
			end: endDate,
			title: title === "" ? defaultTitle : title,
			content: content === "" ? defaultContent : content,
		};
		onUpdate(newSchedule);
		// onClose();
		setIsReadOnly(true);
	};

	const handleDelete = () => {
		onDelete(defaultSchedule);
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
				readonly={isReadOnly}
			></ScheduleInputBox>
			<DialogActions>
				{isReadOnly && <Button onClick={handleClickUpdateButton}>수정</Button>}
				{isReadOnly && <Button onClick={handleDelete}>삭제</Button>}
				{!isReadOnly && (
					<Button
						onClick={defaultSchedule.id === 0 ? handleSave : handleUpdate}
					>
						저장
					</Button>
				)}
				<Button onClick={onClose}>{isReadOnly ? "닫기" : "취소"}</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ScheduleInputPopUpBox;
