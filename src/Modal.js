import React, { useState } from "react";
import { Modal, Input } from "antd";

function Modal_test({ visible, onOk, onCancel, dateStart, dateEnd }, props) {
  const [text, setText] = useState("");
  const onChangeText = (e) => {
    setText(e.currentTarget.value);
  };
  return (
    <>
      <Modal
        title="일정 등록"
        visible={visible}
        onOk={() => {
          onOk(text, dateStart, dateEnd);
          setText("");
        }}
        onCancel={onCancel}
        okText="등록"
        cancelText="취소"
      >
        <p>
          {dateStart.replace(/-/gi, "/")} ~ {dateEnd.replace(/-/gi, "/")}
        </p>
        <Input placeholder="일정" value={text} onChange={onChangeText} />
      </Modal>
    </>
  );
}

export default Modal_test;
