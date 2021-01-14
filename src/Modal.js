import React, { useState } from "react";
import { Modal, Input, Checkbox, Switch } from "antd";
import styled from "styled-components";
import Select from "./Select";
import Dateconfig from "./Dateconfig";
import ColorSelect from "./Colorselect";

const Modal1 = styled(Modal)`
  .ant-modal-title {
    font-size: 15px;
  }
  .ant-modal-header {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .anticon svg {
    height: 1.9rem;
  }
`;
const CalendarInput = styled(Input)`
  padding: 10px;
  height: 30px;
  font-size: 12px;
`;
function Modal_test({
  visible,
  onOk,
  onCancel,
  dateStart,
  dateEnd,
  users,
  isUpdate,
  isClickDate,
  isClickDateHandler,
  isEndClickDate,
  isEndClickDateHandler,
  onChangeStartDate,
  changeStart,
  onChangeEndDate,
  changeEnd,
}) {
  const [text, setText] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [people, setPeople] = useState("");
  const [isSwitch, setIsSwitch] = useState(false);
  const [initColor, setInitColor] = useState("#ff7a45");
  // 입력창 onChange를 이용하여 저장
  const onChangeText = (e) => {
    setText(e.currentTarget.value);
  };

  // checkBox가 true인지 false인지 저장
  const onChangeCheckBox = (e) => {
    setCheckbox(e.target.checked);
  };
  // switch 클릭하면 당일일정등록만 가능
  const onChangeSwitch = () => {
    setIsSwitch(!isSwitch);
    if (!isSwitch) {
      onChangeEndDate(changeStart, isSwitch);
      isEndClickDateHandler(true);
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
  // 일정을 입력한 뒤 Enter키를 누를 시 등록
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onOk(text, people, initColor);
      setIsSwitch(false);
      setInitColor("#ff7a45");
      setCheckbox(false);
      setText("");
    }
  };
  return (
    <>
      {/* 일정을 등록할 수 있는  모달 */}
      <Modal1
        title="일정 등록"
        visible={visible}
        onOk={() => {
          onOk(text, people, initColor);
          setIsSwitch(false);
          setInitColor("#ff7a45");
          setCheckbox(false);
          setText("");
        }}
        onCancel={() => {
          onCancel();
          setIsSwitch(false);
        }}
        okText="등록"
        cancelText="취소"
        width="40rem"
        centered
      >
        <div style={{ marginBottom: "10px" }}>
          <div style={{ display: "inline-block", width: "100px" }}>
            {/* 하루 일정만 등록하고 싶을때 선택 할 수 있는 버튼 */}
            <Switch
              style={{ width: "48%" }}
              onChange={() => onChangeSwitch()}
              checked={isSwitch}
            />{" "}
            <div
              style={{
                width: "45%",
                display: "inline-block",
                textAlign: "center",
              }}
            >
              종일
            </div>
          </div>
          {/* datepicker */}
          <Dateconfig
            dateStart={dateStart}
            dateEnd={dateEnd}
            onChangeStartDate={onChangeStartDate}
            onChangeEndDate={onChangeEndDate}
            isSwitch={isSwitch}
            isUpdate={isUpdate}
            isClickDate={isClickDate}
            isClickDateHandler={isClickDateHandler}
            isEndClickDate={isEndClickDate}
            isEndClickDateHandler={isEndClickDateHandler}
            changeStart={changeStart}
            changeEnd={changeEnd}
          />
          <ColorSelect onColor={onColor} colors={initColor} />
        </div>
        {/* 일정제목입력창 */}
        <CalendarInput
          placeholder="일정을 입력해주세요"
          value={text}
          onChange={onChangeText}
          onKeyDown={onKeyDown}
        />
        {/* 체크박스 클릭시 그룹에 있는 사람지정 할 수 있음 */}
        {checkbox && <Select selectChange={selectChange} users={users} />}
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
