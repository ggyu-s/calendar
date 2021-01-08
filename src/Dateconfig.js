import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DownOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { ko } from "date-fns/esm/locale";
import "./datepicker.css";

function Dateconfig({ dateStart, dateEnd }, props) {
  const d = props.dateStart;
  const [startDate1, setStartDate1] = useState(new Date(d));
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  return (
    <>
      <DatePicker
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          console.log(startDate);
          console.log(startDate1);
        }}
        customInput={<Input suffix={<DownOutlined />} />}
      />
      <span> - </span>
      <DatePicker
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        customInput={<Input suffix={<DownOutlined />} />}
      />
    </>
  );
}

export default Dateconfig;
