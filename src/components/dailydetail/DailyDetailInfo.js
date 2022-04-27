import { useState } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import DailyDetailHeader from "./DailyDetailHeader";
import DailyDetailInfoBody from "./DailyDetailInfoBody";
function DailyDetailInfo({ selectedDay }) {
	return (
		<div>
			<DailyDetailHeader selectedDay={selectedDay}></DailyDetailHeader>
			<DailyDetailInfoBody></DailyDetailInfoBody>
		</div>
	);
}
export default DailyDetailInfo;
