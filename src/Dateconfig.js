import React, { useCallback, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { DatepickerWrapper } from "./styles";
import moment from "moment";
import DateChange from "./Contexts/SampleContext";
import Time from "./Time";
import DateAdd from "./Date";

function Dateconfig({ isSwitch }) {
  const { state, actions } = useContext(DateChange);

  const { dateStart, dateEnd, startTime, endTime } = state;

  let startDatepicker = "";
  let endDatepicker = "";

  const onStartDateChange = useCallback(
    (date) => {
      actions.setDateStart(moment(date).format("YYYY-MM-DD"));
    },
    [actions]
  );

  const onEndDateChange = useCallback(
    (date) => {
      actions.setDateEnd(moment(date).format("YYYY-MM-DD"));
    },
    [actions]
  );

  const onStartTimeChange = useCallback(
    (e) => {
      actions.setStartTime(String(e._d).substring(16, 24));
      console.log(e._d);
    },
    [actions]
  );

  const onEndTimeChange = useCallback(
    (e) => {
      actions.setEndTime(String(e._d).substring(16, 24));
      console.log(e._d);
    },
    [actions]
  );

  if (String(new Date(dateStart)) === "Invalid Date") {
    console.log(true);
  } else {
    startDatepicker = (
      <DateAdd dateChange={onStartDateChange} date={dateStart} />
    );
  }

  if (String(new Date(dateEnd)) === "Invalid Date") {
    console.log("end", true);
  } else {
    endDatepicker = <DateAdd dateChange={onEndDateChange} date={dateEnd} />;
  }

  return (
    <>
      <DatepickerWrapper />
      {/* 클린한 시작날짜를 표시 */}
      {startDatepicker}
      {/* 시작 시간 */}
      <Time timeChange={onStartTimeChange} time={startTime} />
      <span> - </span>
      {/* 클린한 끝나는 날짜를 표시 */}
      {!isSwitch && <>{endDatepicker}</>}
      {/* 끝 시간 */}
      <Time timeChange={onEndTimeChange} time={endTime} />
    </>
  );
}

export default Dateconfig;
