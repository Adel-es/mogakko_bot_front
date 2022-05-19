import { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@material-ui/pickers";

interface ScheduleInputProps {
  title: string;
  startDate: Date;
  endDate: Date;
  content: string;
}

function ScheduleInputBox({
  title,
  startDate,
  endDate,
  content,
}: ScheduleInputProps) {
  const [_title, setTitle] = useState(title);
  const [_startDate, setStartDate] = useState(startDate);
  const [_endDate, setEndDate] = useState(endDate);
  const [_content, setContent] = useState(content);

  const handleChange = (date: Date) => {
    setStartDate(date);
  };
  return (
    <InputBoxWrapper>
      <TextField label="제목" defaultValue={_title}></TextField>
      <div>
        <DatePicker
          label="시작 시간"
          value={_startDate}
          onChange={setStartDate}
        ></DatePicker>
      </div>
      <TextField
        label="내용"
        multiline
        rows={4}
        defaultValue={_content}
      ></TextField>
    </InputBoxWrapper>
  );
}

ScheduleInputBox.defaultProps = {
  title: "(제목 없음)",
  startDate: new Date(),
  endDate: new Date(),
  content: "(내용 없음)",
};

const InputBoxWrapper = styled.div``;
const InputTitle = styled.div``;
const InputDate = styled.div``;
const InputContent = styled.div``;

export default ScheduleInputBox;
