import React from "react";
import { Select } from "antd";
import styled from "styled-components";

const ParticipantInput = styled(Select)`
  margin-top: 10px;
  height: 30px;
  font-size: 12px;
`;

function SelectPeople({ selectChange, users }) {
  const { Option } = Select;

  return (
    <ParticipantInput
      mode="multiple"
      style={{ width: "100%" }}
      placeholder="참가자"
      onChange={selectChange}
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
