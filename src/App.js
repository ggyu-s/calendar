import "./App.css";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugsin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "./Modal";

/**
 * 캘린더 컴포넌트
 */
function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [events, setEvents] = useState([]);

  const onOk = (text, start, end) => {
    if (!text) {
      alert("일정을 등록해주세요.");
      return;
    }
    setIsVisible(false);
    const color = ["black", "powderblue", "lightgreen", "orange", "grey"];
    const background = color[Math.floor(Math.random() * 5)];
    const border = background;
    setEvents([
      ...events,
      {
        title: text,
        start: start,
        end: end,
        backgroundColor: background,
        borderColor: border,
      },
    ]);
  };
  const onCancel = () => {
    setIsVisible(false);
  };
  return (
    <div style={{ width: "90%", height: "1000px", margin: "0 auto" }}>
      <FullCalendar
        plugins={[dayGridPlugsin, interactionPlugin]}
        initialView="dayGridMonth"
        timeZone="UTC"
        events={events}
        editable={true}
        dayMaxEvents={true}
        selectable
        dateClick={(info) => {}}
        select={(info) => {
          setIsVisible(true);
          setDateStart(info.startStr);
          setDateEnd(info.endStr);
        }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
        }}
        locale="ko"
      />
      {/* 모달 컴포넌트 */}
      <Modal
        visible={isVisible}
        onOk={onOk}
        onCancel={onCancel}
        dateStart={dateStart}
        dateEnd={dateEnd}
      />
    </div>
  );
}
export default App;
