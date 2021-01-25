import React, { useState } from "react";

const DateChange = React.createContext({
  state: { dateStart: "", dateEnd: " " },
  actions: {
    setDateStart: () => {},
    setDateEnd: () => {},
  },
});
export const DateProvider = ({ children }) => {
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const value = {
    state: { dateStart, dateEnd },
    actions: { setDateStart, setDateEnd },
  };

  return <DateChange.Provider value={value}>{children}</DateChange.Provider>;
};

export default DateChange;
