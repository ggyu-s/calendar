import React, { useState } from "react";
import { Modal, Input, Checkbox } from "antd";
import styled from "styled-components";
import Select from "./Select";
import Dateconfig from "./Dateconfig";

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
const Datediv = styled.div`
  font-size: 13px;
  margin-bottom: 5px;
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

  const onChangeText = (e) => {
    setText(e.currentTarget.value);
  };

  const onChangeCheckBox = (e) => {
    setCheckbox(e.target.checked);
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
          onOk(text, dateStart, dateEnd, people);
          console.log(dateStart, dateEnd);
          setText("");
        }}
        onCancel={onCancel}
        okText="등록"
        cancelText="취소"
        width="40rem"
        centered
      >
        <Dateconfig dateStart={dateStart} dateEnd={dateEnd} />
        <CalendarInput
          placeholder="일정을 입력해주세요"
          value={text}
          onChange={onChangeText}
        />
        {checkbox && <Select selectChange={selectChange} />}
        <Checkbox style={{ marginTop: "10px" }} onChange={onChangeCheckBox}>
          참석자 지정
        </Checkbox>
      </Modal1>
    </>
  );
}

export default Modal_test;
