import React from "react";
import { Select } from "antd";
import styled from "styled-components";

const ParticipantInput = styled(Select)`
  margin-top: 10px;
  height: 30px;
  font-size: 12px;
`;

/**
 * 그룹에 가입된 사람을 선택할 수 있음
 */
function SelectPeople({ selectChange, users, members, checkBox }) {
  const { Option } = Select;

  const defaultValue = () => {
    if (!checkBox) {
      return undefined;
    }
    return members !== "" ? members : undefined;
  };

  return (
    <ParticipantInput
      mode="multiple"
      style={{ width: "100%" }}
      placeholder="참가자"
      onChange={selectChange}
      defaultValue={defaultValue()}
    >
      {users.map((a) => (
        <Option key={a.id} value={a.name}>
          {a.name}
        </Option>
      ))}
    </ParticipantInput>
  );
}

export default SelectPeople;
