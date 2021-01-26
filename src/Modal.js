import React, { useContext, useEffect, useState } from "react";
import { Checkbox, Switch } from "antd";
import Select from "./Select";
import Dateconfig from "./Dateconfig";
import ColorSelect from "./Colorselect";
import { CalendarInput, Modal1 } from "./styles";
import DateChange from "./Contexts/SampleContext";
function Modal_test({
  visible,
  onOk,
  onCancel,
  users,
  isUpdate,
  setIsUpdate,
  event,
}) {
  const [text, setText] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [people, setPeople] = useState("");
  const [isSwitch, setIsSwitch] = useState(false);
  const [initColor, setInitColor] = useState("#ff7a45");
  const [updateText, setUpdateText] = useState("");

  const { state, actions } = useContext(DateChange);

  // 입력창 onChange를 이용하여 저장
  const onChangeText = (e) => {
    if (isUpdate) {
      setUpdateText(e.currentTarget.value);
    } else {
      setText(e.currentTarget.value);
    }
  };

  useEffect(() => {
    if (isUpdate) {
      event.members && setCheckbox(true);
      event.allDay === 1 ? setIsSwitch(true) : setIsSwitch(false);
      setUpdateText(event.title);
      setInitColor(event.backgroundColor);
    }
  }, [event, isUpdate]);

  // checkBox가 true인지 false인지 저장
  const onChangeCheckBox = (e) => {
    setCheckbox(e.target.checked);
    if (!e.target.checked) {
      setPeople("");
    }
  };
  // switch 클릭하면 당일일정등록만 가능
  const onChangeSwitch = () => {
    setIsSwitch(!isSwitch);
    if (!isSwitch) {
      actions.setDateEnd(state.dateStart);
    }
  };
  // 캘린더 일정에 background color 변경
  const onColor = (color) => {
    setInitColor(color);
  };
  // 지정한사람만 볼 수 있도록 등록
  function selectChange(value) {
    setPeople(value);
  }

  const register = () => {
    if (isUpdate) {
      onOk(updateText, people, initColor, isSwitch);
    } else {
      onOk(text, people, initColor, isSwitch);
    }
    setIsSwitch(false);
    setInitColor("#ff7a45");
    setCheckbox(false);
    setPeople("");
    setText("");
    actions.setStartTime("00:00");
    actions.setEndTime("00:00");
  };

  // 일정을 입력한 뒤 Enter키를 누를 시 등록
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      register();
    }
  };

  return (
    <>
      {/* 일정을 등록할 수 있는  모달 */}
      <Modal1
        title="일정 등록"
        visible={visible}
        onOk={() => {
          register();
        }}
        onCancel={() => {
          onCancel();
          setIsSwitch(false);
          setCheckbox(false);
          setInitColor("#ff7a45");
          setPeople("");
          setText("");
          actions.setStartTime("00:00");
          actions.setEndTime("00:00");
          if (isUpdate) {
            setIsUpdate(false);
          }
        }}
        okText="등록"
        cancelText="취소"
        width="40rem"
        centered
      >
        <div
          style={{ marginBottom: "10px", height: "36px", lineHeight: "36px" }}
        >
          {/* 하루 일정만 등록하고 싶을때 선택 할 수 있는 버튼 */}
          <Switch
            style={{ width: "50px" }}
            onChange={() => onChangeSwitch()}
            checked={isSwitch}
          />{" "}
          <div
            style={{
              width: "50px",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            종일
          </div>
          {/* datepicker */}
          <Dateconfig isSwitch={isSwitch} />
          {/* 색상 선택 */}
          <ColorSelect onColor={onColor} colors={initColor} />
        </div>
        {/* 일정제목입력창 */}
        <CalendarInput
          placeholder="일정을 입력해주세요"
          value={isUpdate ? updateText : text}
          onChange={onChangeText}
          onKeyDown={onKeyDown}
        />
        {/* 체크박스 클릭시 그룹에 있는 사람지정 할 수 있음 */}
        {checkbox && (
          <Select
            selectChange={selectChange}
            users={users}
            members={event.members}
            isUpdate={isUpdate}
            checkBox={checkbox}
          />
        )}
        <Checkbox
          style={{ marginTop: "10px" }}
          checked={checkbox}
          onChange={onChangeCheckBox}
        >
          참석자 지정
        </Checkbox>
      </Modal1>
    </>
  );
}

export default Modal_test;
