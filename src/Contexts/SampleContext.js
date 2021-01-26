import React, { useState } from "react";

const DateChange = React.createContext({
  state: { dateStart: "", dateEnd: " " },
  actions: {
    setDateStart: () => {},
    setDateEnd: () => {},
    setStartTime: () => {},
    setEndTime: () => {},
  },
});
export const DateProvider = ({ children }) => {
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");

  const value = {
    state: { dateStart, dateEnd, startTime, endTime },
    actions: { setDateStart, setDateEnd, setStartTime, setEndTime },
  };

  return <DateChange.Provider value={value}>{children}</DateChange.Provider>;
};

export default DateChange;
