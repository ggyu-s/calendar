import React, { useState } from "react";
import { Modal, Input, Checkbox, Switch } from "antd";
import styled from "styled-components";
import Select from "./Select";
import Dateconfig from "./Dateconfig";
import moment from "moment";

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

function Modal_test({ visible, onOk, onCancel, dateStart, dateEnd }) {
  const [text, setText] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [people, setPeople] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isSwitch, setIsSwitch] = useState(false);

  const onChangeText = (e) => {
    setText(e.currentTarget.value);
  };

  const onChangeCheckBox = (e) => {
    setCheckbox(e.target.checked);
  };

  // datepicker에 있는 날짜
  const onChangeStartDate = (startDate) => {
    setStartDate(moment(startDate).format("YYYY-MM-DD"));
  };
  // datepicker에 있는 날짜
  const onChangeEndDate = (endDate) => {
    if (isSwitch) {
      return setEndDate(endDate);
    }
    setEndDate(moment(endDate).format("YYYY-MM-DD"));
  };

  // switch 클릭하면 당일일정등록만 가능
  const onChangeSwitch = () => {
    console.log("switch");
    setIsSwitch(!isSwitch);
  };

  function selectChange(value) {
    console.log(`selected ${value}`);
    setPeople(value);
  }

  return (
    <>
      <Modal1
        title="일정 등록"
        visible={visible}
        onOk={() => {
          onOk(text, startDate, endDate, people);
          setIsSwitch(false);
          setText("");
        }}
        onCancel={onCancel}
        okText="등록"
        cancelText="취소"
        width="40rem"
        centered
      >
        <div style={{ marginBottom: "10px" }}>
          <div style={{ display: "inline-block", width: "100px" }}>
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
          />
        </div>
        {/* 일정제목입력창 */}
        <CalendarInput
          placeholder="일정을 입력해주세요"
          value={text}
          onChange={onChangeText}
        />
        {/* 체크박스 클릭시 그룹에 있는 사람지정 할 수 있음 */}
        {checkbox && <Select selectChange={selectChange} />}
        <Checkbox style={{ marginTop: "10px" }} onChange={onChangeCheckBox}>
          참석자 지정
        </Checkbox>
      </Modal1>
    </>
  );
}

export default Modal_test;
