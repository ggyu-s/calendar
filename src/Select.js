import React from "react";
import { Select } from "antd";
import styled from "styled-components";

const ParticipantInput = styled(Select)`
  margin-top: 10px;
  height: 30px;
  font-size: 12px;
`;

function SelectPeople({ selectChange }) {
  const { Option } = Select;

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

  return (
    <ParticipantInput
      mode="multiple"
      style={{ width: "100%" }}
      placeholder="참가자"
      onChange={selectChange}
    >
      {children.map((a) => (
        <Option key={a.id}>{a.name}</Option>
      ))}
    </ParticipantInput>
  );
}

export default SelectPeople;
