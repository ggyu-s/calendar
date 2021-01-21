import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DownOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { ko } from "date-fns/esm/locale";
import "./datepicker.css";

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
}) {
  return (
    <>
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
        disabled={isSwitch}
        customInput={<Input suffix={<DownOutlined />} />}
      />
    </>
  );
}
Dateconfig.defaultProps = {
  isClickDate: false,
  isEndClickDate: false,
};

export default Dateconfig;
