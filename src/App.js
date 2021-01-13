import React, { useCallback, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugsin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal } from "antd";
import Modal1 from "./Modal";
import Modal2 from "./Modal2";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const users = [
  {
    id: 1,
    name: "nive",
  },
  {
    id: 2,
    name: "sam",
  },
  {
    id: 3,
    name: "gyu",
  },
  {
    id: 4,
    name: "jung",
  },
  {
    id: 5,
    name: "cheol",
  },
];
/**
 * 캘린더 컴포넌트
 */
function App() {
  const { confirm } = Modal;
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
  const id = useRef(1);

  const onOk = (text, start, end, people, color) => {
    if (!text) {
      alert("일정을 등록해주세요.");
      return;
    }
    setIsVisible(false);
    // const color = ["black", "powderblue", "lightgreen", "orange", "grey"];
    // const background = color[Math.floor(Math.random() * 5)];
    // const border = background;

    setEvents([
      ...events,
      {
        id: id.current,
        title: text,
        start: start,
        end: end,
        backgroundColor: color,
        borderColor: color,
        members: people,
      },
    ]);
    id.current++;
  };

  const onCancel = () => {
    setIsVisible(false);
    setIsDrawerVisible(false);
  };

  const remove = useCallback(
    (eventId) => {
      return confirm({
        icon: <ExclamationCircleOutlined />,
        content: <div>삭제하시겠습니까?</div>,
        onOk() {
          setEvents([...events.filter((p) => p.id !== eventId)]);
          setIsDrawerVisible(false);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    [events, confirm]
  );

  return (
    <>
      {/* 캘린더 */}
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
            setDateStart(info.start);
            setDateEnd(info.end);
          }}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth",
          }}
          locale="ko"
          eventClick={(e) => {
            console.log(events);
            console.log(e);
            setEvent(
              ...events.filter((p) => p.id === Number(e.event._def.publicId))
            );
            setIsDrawerVisible(true);
            console.log(event);
          }}
        />
        {/*일정 등록 모달 컴포넌트 */}
        <Modal1
          visible={isVisible}
          onOk={onOk}
          onCancel={onCancel}
          dateStart={dateStart}
          dateEnd={dateEnd}
          isStartDate={false}
          users={users}
        />
        {/* 일정 확인 모달 컴포넌트 */}
        <Modal2
          visible={isDrawerVisible}
          onClose={onCancel}
          event={event}
          remove={remove}
          users={users}
        />
      </div>
    </>
  );
}
export default App;
