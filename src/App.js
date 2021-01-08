import "./App.css";
import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugsin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "./Modal";
import Modal2 from "./Modal2";

/**
 * 캘린더 컴포넌트
 */
function App() {
  /**
   * 일정 등록 모달
   */
  const [isVisible, setIsVisible] = useState(false);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState([]);
  /**
   * 일정 확인 모달
   */
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [content, setContent] = useState();
  const id = useRef(1);

  const onOk = (text, start, end, people) => {
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
        id: id.current,
        title: text,
        start: start,
        end: end,
        backgroundColor: background,
        borderColor: border,
        people: people,
      },
    ]);
    id.current++;
  };
  const onCancel = () => {
    setIsVisible(false);
    setIsDrawerVisible(false);
  };

  return (
    <>
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
            console.log(info);
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
          eventClick={(e) => {
            console.log(events);
            console.log(e.event._def.publicId);
            setEvent(
              ...events.filter((p) => p.id === Number(e.event._def.publicId))
            );
            setIsDrawerVisible(true);
            console.log(event);
          }}
        />
        {/*일정 등록 모달 컴포넌트 */}
        <Modal
          visible={isVisible}
          onOk={onOk}
          onCancel={onCancel}
          dateStart={dateStart}
          dateEnd={dateEnd}
        />
        {/* 일정 확인 모달 컴포넌트 */}
        <Modal2 visible={isDrawerVisible} onClose={onCancel} event={event} />
      </div>
    </>
  );
}
export default App;
