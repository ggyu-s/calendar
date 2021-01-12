import React from "react";
import { Button, Drawer } from "antd";
import styled from "styled-components";

const DrawerCus = styled(Drawer)`
  .ant-drawer-footer {
    text-align: right;
  }
  .ant-drawer-footer button:nth-child(2) {
    margin-left: 8px;
  }
`;
const children = [
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
 * 일정을 확인 할 수 있습니다.
 */
function Modal2({ visible, onClose, event }) {
  return (
    <>
      <DrawerCus
        title="일정 (2021/01/14)"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        width="720px"
        footer={
          <>
            <Button>삭제</Button>
            <Button>수정</Button>
          </>
        }
      >
        <div>{event.title}</div>
      </DrawerCus>
    </>
  );
}

export default Modal2;
