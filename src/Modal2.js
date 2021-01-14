import React, { useState } from "react";
import { Button, Drawer } from "antd";
import styled from "styled-components";
import Modal1 from "./Modal";

const DrawerCus = styled(Drawer)`
  .ant-drawer-footer {
    text-align: right;
  }
  .ant-drawer-footer button:nth-child(2) {
    margin-left: 8px;
  }
  .ant-drawer-content {
    height: 500px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  .ant-drawer-content-wrapper {
    height: 500px;
  }
`;

/**
 * 일정을 확인 할 수 있습니다.
 */
function Modal2({ visible, onClose, event, remove, update, users }) {
  const [isModal, setIsModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  // 첫 렌더링 할 때 map.undefined 오류가 발생하기 때문에 if문을 사용
  let members;
  if (event.members) {
    members = event.members.map((member, idx) => <div key={idx}>{member}</div>);
  }

  const onClick = () => {
    setIsModal(!isModal);
    setIsUpdate(true);
  };
  const onUpdate = (isUpdate) => {
    setIsUpdate(isUpdate);
  };
  const onCancel = () => {
    setIsModal(false);
  };
  const onOk = (text, start, end, people, color) => {
    update(event.id, text, start, end, people, color);
    setIsModal(false);
  };
  return (
    <>
      <DrawerCus
        title="일정"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        width="500px"
        footer={
          <>
            <Button onClick={() => remove(event.id)}>삭제</Button>
            <Button onClick={() => onClick()}>수정</Button>
          </>
        }
      >
        <div>일정날짜</div>
        <div>
          <span>{event.start}</span>
          {event.end !== "" ? (
            <>
              <span> - </span>
              <span>{event.end}</span>
            </>
          ) : null}
        </div>
        <div>일정내용</div>
        <div>{event.title}</div>
        <div>일정을 볼 수 있는 회원</div>
        <div>{members}</div>
      </DrawerCus>
      <Modal1
        visible={isModal}
        dateStart={event.start}
        dateEnd={event.end}
        onOk={onOk}
        onCancel={onCancel}
        users={users}
        onUpdate={onUpdate}
        isUpdate={isUpdate}
      />
    </>
  );
}

export default Modal2;
