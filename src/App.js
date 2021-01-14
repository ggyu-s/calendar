import React, { useCallback, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugsin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal } from "antd";
import Modal1 from "./Modal";
import Modal2 from "./Modal2";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
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
  const [dateStart, setDateStart] = useState(""); // 달력 클릭 했을 시에 datepick에 표시 할 상태
  const [dateEnd, setDateEnd] = useState(""); // 달력 클릭 했을 시에 datepick에 표시 할 상태
  const [changeStart, setChangeStart] = useState(""); // 날짜 상태저장
  const [changeEnd, setChangeEnd] = useState(""); // 날짜 상태저장
  const [events, setEvents] = useState([]); // 이벤트 저장
  const [event, setEvent] = useState([]); // 한 개의 이벤트 가져오기
  const [isClickDate, setIsClickDate] = useState(false); // 시작 날짜
  const [isEndClickDate, setIsEndClickDate] = useState(false); // 끝 날짜

  // 달력에서 클릭한 시작 날짜 표시
  const isClickDateHandler = useCallback((isClick) => {
    setIsClickDate(isClick);
  }, []);

  // 달력에서 클릭한 끝 날짜 표시
  const isEndClickDateHandler = useCallback((isClick) => {
    setIsEndClickDate(isClick);
  }, []);

  // 시작 날짜 저장
  const onChangeStartDate = useCallback((startDate) => {
    setChangeStart(moment(startDate).format("YYYY-MM-DD"));
  }, []);
  // 끝 날짜 저장
  const onChangeEndDate = useCallback((endDate, isSwitch) => {
    if (isSwitch) {
      setChangeEnd(endDate);
    }
    setChangeEnd(moment(endDate).format("YYYY-MM-DD"));
  }, []);

  /**
   * 일정 확인 모달
   */
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const id = useRef(1);

  const onOk = (text, people, color) => {
    if (!text) {
      alert("일정을 등록해주세요.");
      return;
    }
    setIsVisible(false);

    setEvents([
      ...events,
      {
        id: id.current,
        title: text,
        start: changeStart,
        end: changeEnd,
        backgroundColor: color,
        borderColor: color,
        members: people,
      },
    ]);
    id.current++;

    setIsClickDate(false);
  };

  const onCancel = useCallback(() => {
    setIsVisible(false);
    setIsDrawerVisible(false);
    setIsClickDate(false);
  }, []);

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
  const update = useCallback(
    (id, text, start, end, people, color) => {
      setEvents(
        events.map((event) => {
          return event.id === id
            ? {
                ...event,
                title: text,
                start: start,
                end: end,
                backgroundColor: color,
                borderColor: color,
                members: people,
              }
            : event;
        })
      );
    },
    [events]
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
          // 날짜 클릭시 모달창 띄우기
          select={(info) => {
            setIsVisible(true);
            setDateStart(info.start);
            setDateEnd(info.end);
            setChangeStart(moment(info.start).format("YYYY-MM-DD"));
            setChangeEnd(moment(info.end).format("YYYY-MM-DD"));
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
          dateStart={dateStart}
          dateEnd={dateEnd}
          isStartDate={false}
          users={users}
          isClickDate={isClickDate}
          isClickDateHandler={isClickDateHandler}
          isEndClickDate={isEndClickDate}
          isEndClickDateHandler={isEndClickDateHandler}
          onChangeStartDate={onChangeStartDate}
          changeStart={changeStart}
          onChangeEndDate={onChangeEndDate}
          changeEnd={changeEnd}
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
