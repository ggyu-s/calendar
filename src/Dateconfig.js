import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DownOutlined } from "@ant-design/icons";
import { Input, TimePicker } from "antd";
import { ko } from "date-fns/esm/locale";
import { DatepickerWrapper } from "./styles";
import moment from "moment";

function Dateconfig({
  dateStart,
  dateEnd,
  onChangeStartDate,
  onChangeEndDate,
  isSwitch,
  isUpdate,
  isClickDate,
  setIsClickDate,
  isEndClickDate,
  setIsEndClickDate,
  changeStart,
  changeEnd,
  setStartTime,
  setEndTime,
  startTime,
  endTime,
}) {
  const onChageStartTime = (e) => {
    setStartTime(String(e._d).substring(16, 24));
  };

  const onChageEndTime = (e) => {
    setEndTime(String(e._d).substring(16, 24));
  };

  return (
    <>
      <DatepickerWrapper />
      {/* 클린한 시작날짜를 표시 */}
      <DatePicker
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={
          isClickDate
            ? new Date(changeStart)
            : isUpdate
            ? new Date(dateStart)
            : dateStart
        }
        onChange={(date) => {
          setIsClickDate(true);
          onChangeStartDate(date);
        }}
        customInput={<Input suffix={<DownOutlined />} />}
      />
      <TimePicker
        minuteStep={15}
        defaultValue={moment("24:00", "HH:mm")}
        format={"HH:mm"}
        suffixIcon={<DownOutlined />}
        showNow={false}
        onChange={onChageStartTime}
        placeholder="시간"
        allowClear={false}
        value={moment(startTime, "HH:mm")}
      />
      {/* 클린한 끝나는 날짜를 표시 */}
      <span> - </span>
      <DatePicker
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={
          isEndClickDate
            ? new Date(changeEnd)
            : isUpdate
            ? new Date(dateEnd)
            : dateEnd
        }
        onChange={(date) => {
          setIsEndClickDate(true);
          onChangeEndDate(date);
        }}
        customInput={<Input suffix={<DownOutlined />} />}
      />
      <TimePicker
        minuteStep={15}
        defaultValue={moment("24:00", "HH:mm")}
        format={"HH:mm"}
        suffixIcon={<DownOutlined />}
        showNow={false}
        onChange={onChageEndTime}
        placeholder="시간"
        allowClear={false}
        value={moment(endTime, "HH:mm")}
      />
    </>
  );
}
Dateconfig.defaultProps = {
  isClickDate: false,
  isEndClickDate: false,
};

export default Dateconfig;
