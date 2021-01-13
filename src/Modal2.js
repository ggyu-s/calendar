import React, { useState } from "react";
import { Button, Drawer } from "antd";
import styled from "styled-components";

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
function Modal2({ visible, onClose, event, remove, users }) {
  let members;
  if (event.members) {
    members = event.members.map((member, idx) => <div key={idx}>{member}</div>);
  }

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
            <Button>수정</Button>
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
    </>
  );
}

export default Modal2;
