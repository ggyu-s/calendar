import React, { useCallback, useEffect, useState } from "react";
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
}) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isStartDate, setIsStartDate] = useState(false);
  const [isEndDate, setIsEndDate] = useState(false);

  // datepicker 날짜 선택시
  const changeStartDate = useCallback((date) => {
    onChangeStartDate(date);
  }, []);
  // datepicker 날짜 선택시
  const changeEndDate = useCallback((date) => {
    onChangeEndDate(date);
  }, []);
  // fullcalendar에서 날짜 클릭시 datepicker에서 클릭한 날짜 표시
  useEffect(() => {
    onChangeStartDate(dateStart);
    setIsStartDate(false);
  }, [dateStart]);
  // fullcalendar에서 날짜 클릭시 datepicker에서 클릭한 날짜 표시
  useEffect(() => {
    onChangeEndDate(dateEnd);
    setIsEndDate(false);
  }, [dateEnd]);

  return (
    <>
      {/* 클린한 시작날짜를 표시 */}
      {isStartDate ? (
        <DatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            changeStartDate(date);
          }}
          customInput={<Input suffix={<DownOutlined />} />}
        />
      ) : (
        <DatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          selected={dateStart}
          onChange={(date, event) => {
            setIsStartDate(true);
            setStartDate(date);
            changeStartDate(date);
          }}
          customInput={<Input suffix={<DownOutlined />} />}
        />
      )}
      <span> - </span>
      {/* 클린한 끝나는 날짜를 표시 */}
      {isEndDate ? (
        <DatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
            changeEndDate(date);
          }}
          customInput={<Input suffix={<DownOutlined />} />}
        />
      ) : (
        <DatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          selected={dateEnd}
          onChange={(date) => {
            setIsEndDate(true);
            setEndDate(date);
            changeEndDate(date);
          }}
          customInput={<Input suffix={<DownOutlined />} />}
        />
      )}
    </>
  );
}

export default Dateconfig;
