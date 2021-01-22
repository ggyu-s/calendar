import React, { useState } from "react";
import { Button } from "antd";
import Modal1 from "./Modal";
import { DrawerCus } from "./styles";

/**
 * 일정을 확인 할 수 있습니다.
 */
function Modal2({
  visible,
  onClose,
  event,
  remove,
  update,
  users,
  onChangeStartDate,
  changeStart,
  onChangeEndDate,
  changeEnd,
}) {
  const [isModal, setIsModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  // 첫 렌더링 할 때 map.undefined 오류가 발생하기 때문에 if문을 사용
  let member;
  if (event.members) {
    member = event.members.map((member, idx) => <div key={idx}>{member}</div>);
  }
  const onInitUpdate = (isUpdate) => {
    setIsUpdate(isUpdate);
  };
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
  const onOk = (text, people, color, startTime, endTime, isSwitch) => {
    update(event.id, text, people, color, startTime, endTime, isSwitch);
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
          <span>
            {String(event.start).substring(0, 10)}(
            {String(event.start).substring(11, 16)})
          </span>
          {String(event.start).substring(0, 10) !== event.end ? (
            <>
              <span> - </span>
              <span>
                {String(event.end).substring(0, 10)}(
                {String(event.end).substring(11, 16)})
              </span>
            </>
          ) : null}
        </div>
        <div>일정내용</div>
        <div>{event.title}</div>
        <div>일정을 볼 수 있는 회원</div>
        <div>{member}</div>
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
        title={event.title}
        members={event.members}
        onInitUpdate={onInitUpdate}
        onChangeStartDate={onChangeStartDate}
        changeStart={changeStart}
        onChangeEndDate={onChangeEndDate}
        changeEnd={changeEnd}
        saveColor={event.backgroundColor}
      />
    </>
  );
}

export default Modal2;
