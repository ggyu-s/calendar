import React, { useCallback, useContext, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugsin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal } from "antd";
import Modal1 from "./Modal";
import Modal2 from "./Modal2";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { FullCalendarWrapper } from "./styles";
import DateChange from "./Contexts/SampleContext";
/**
 * 더미데이터
 */
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
  const [events, setEvents] = useState([]); // 이벤트 저장
  const [event, setEvent] = useState([]); // 한 개의 이벤트 가져오기

  const { state, actions } = useContext(DateChange);

  const { dateStart, dateEnd } = state;

  const date_Start = moment(dateStart).format("YYYY-MM-DD");
  const date_End = moment(dateEnd).format("YYYY-MM-DD");

  /**
   * 일정 확인 모달
   */
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const id = useRef(1);

  // 일정 등록
  const onOk = (text, people, color, startTime, endTime, isSwitch) => {
    if (!text) {
      alert("일정을 등록해주세요.");
      return;
    }
    setIsVisible(false);
    setEvents([
      ...events,
      {
        id: id.current,
        allDay: "",
        title: text,
        start: `${date_Start}T${startTime}`,
        end: isSwitch
          ? date_Start
          : date_Start >= date_End
          ? date_Start
          : `${date_End}T${endTime}`,
        backgroundColor: color,
        borderColor: color,
        members: people,
        user_id: "",
      },
    ]);
    id.current++;
    console.log(events);
  };

  const onCancel = useCallback(() => {
    setIsVisible(false);
    setIsDrawerVisible(false);
  }, []);

  // 일정 삭제
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

  // 일정 수정
  const update = useCallback(
    (id, text, people, color, startTime, endTime, isSwitch) => {
      setEvents(
        events.map((event) => {
          return event.id === id
            ? {
                ...event,
                title: text,
                start: `${date_Start}T${startTime}`,
                end: isSwitch
                  ? date_Start
                  : date_Start >= date_End
                  ? date_Start
                  : `${date_End}T${endTime}`,
                backgroundColor: color,
                borderColor: color,
                members: people,
              }
            : event;
        })
      );
      setIsDrawerVisible(false);
    },
    [events, date_Start, date_End]
  );

  return (
    <>
      {/* 캘린더 */}
      <FullCalendarWrapper />
      <div style={{ width: "800px", height: "500px", margin: "0 auto" }}>
        <FullCalendar
          plugins={[dayGridPlugsin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          timeZone="UTC"
          events={events}
          editable={false}
          dayMaxEvents={true}
          selectable
          // 날짜 클릭시 모달창 띄우기
          select={(info) => {
            setIsVisible(true);
            actions.setDateStart(moment(info.start).format("YYYY-MM-DD"));
            actions.setDateEnd(moment(info.end).format("YYYY-MM-DD"));
          }}
          // 달력 위에 있는 버튼 또는 연도/월 설정
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth",
          }}
          locale="ko"
          // 등록한 일정 클릭시 모달창 띄우기
          eventClick={(e) => {
            // 클릭한 일정의 id 값을 찾아서 useState에 저장하여 모달창에 표시
            setEvent(
              ...events.filter((p) => p.id === Number(e.event._def.publicId))
            );
            setIsDrawerVisible(true);
          }}
        />
        {/*일정 등록 모달 컴포넌트 */}
        <Modal1
          visible={isVisible}
          onOk={onOk}
          onCancel={onCancel}
          isStartDate={false}
          users={users}
        />
        {/* 일정 확인 모달 컴포넌트 */}
        <Modal2
          visible={isDrawerVisible}
          onClose={onCancel}
          event={event}
          remove={remove}
          update={update}
          onOk={onOk}
          users={users}
        />
      </div>
    </>
  );
}
export default App;
