import React, { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DownOutlined } from "@ant-design/icons";
import { Input, TimePicker } from "antd";
import { ko } from "date-fns/esm/locale";
import { DatepickerWrapper } from "./styles";
import moment from "moment";
import DateChange from "./Contexts/SampleContext";

function Dateconfig({
  isSwitch,
  isUpdate,
  isClickDate,
  setIsClickDate,
  isEndClickDate,
  setIsEndClickDate,
  setStartTime,
  setEndTime,
  startTime,
  endTime,
}) {
  const { state, actions } = useContext(DateChange);

  const { dateStart, dateEnd } = state;

  let datepick = "";
  /**
   * 시작 시간 변경
   */
  const onChageStartTime = (e) => {
    setStartTime(String(e._d).substring(16, 24));
  };
  /**
   * 끝 시간 변경
   */
  const onChageEndTime = (e) => {
    setEndTime(String(e._d).substring(16, 24));
  };

  if (String(new Date(dateStart)) === "Invalid Date") {
    console.log(true);
  } else {
    datepick = (
      <DatePicker
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={
          isClickDate
            ? new Date(dateStart)
            : isUpdate
            ? new Date(dateStart)
            : new Date(dateStart)
        }
        onChange={(date) => {
          setIsClickDate(true);
          actions.setDateStart(moment(date).format("YYYY-MM-DD"));
        }}
        customInput={<Input suffix={<DownOutlined />} />}
      />
    );
  }

  return (
    <>
      <DatepickerWrapper />
      {/* 클린한 시작날짜를 표시 */}
      {/* <DatePicker
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={
          isClickDate
            ? new Date(dateStart)
            : isUpdate
            ? new Date(dateStart)
            : new Date(dateStart)
        }
        onChange={(date) => {
          setIsClickDate(true);
          actions.setDateStart(moment(date).format("YYYY-MM-DD"));
        }}
        customInput={<Input suffix={<DownOutlined />} />}
      /> */}
      {datepick}
      {/* 시작 시간 */}
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
      <span> - </span>
      {/* 클린한 끝나는 날짜를 표시 */}
      {!isSwitch && (
        <>
          <DatePicker
            locale={ko}
            dateFormat="yyyy-MM-dd"
            selected={
              isEndClickDate
                ? new Date(dateEnd)
                : isUpdate
                ? new Date(dateEnd)
                : null
            }
            onChange={(date) => {
              setIsEndClickDate(true);
              actions.setDateEnd(moment(date).format("YYYY-MM-DD"));
            }}
            customInput={<Input suffix={<DownOutlined />} />}
          />
        </>
      )}
      {/* 끝 시간 */}
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
