import { DownOutlined } from "@ant-design/icons";
import { TimePicker } from "antd";
import React from "react";
import moment from "moment";

function Time({ timeChange, time }) {
  return (
    <TimePicker
      minuteStep={15}
      defaultValue={moment("00:00", "HH:mm")}
      format={"HH:mm"}
      suffixIcon={<DownOutlined />}
      showNow={false}
      onChange={(e) => timeChange(e)}
      placeholder="시간"
      allowClear={false}
      value={moment(time, "HH:mm")}
    />
  );
}

export default Time;
