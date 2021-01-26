import { Input } from "antd";
import DatePicker from "react-datepicker";
import React from "react";
import { ko } from "date-fns/esm/locale";
import { DownOutlined } from "@ant-design/icons";

function DateAdd({ dateChange, date }) {
  return (
    <DatePicker
      locale={ko}
      dateFormat="yyyy-MM-dd"
      selected={new Date(date)}
      onChange={(date) => {
        dateChange(date);
      }}
      customInput={<Input suffix={<DownOutlined />} />}
    />
  );
}

export default DateAdd;
