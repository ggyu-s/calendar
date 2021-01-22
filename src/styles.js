import { Drawer, Input, Modal } from "antd";
import styled, { createGlobalStyle } from "styled-components";

export const Modal1 = styled(Modal)`
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

export const CalendarInput = styled(Input)`
  padding: 10px;
  height: 30px;
  font-size: 12px;
`;

export const DrawerCus = styled(Drawer)`
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

export const FullCalendarWrapper = createGlobalStyle`
   a {
  color: black;
  }
  .fc-daygrid-day-number{
      font-size:10px;
  }
`;

export const DatepickerWrapper = createGlobalStyle`
    .react-datepicker__tab-loop {
  display: inline-block;
}
.react-datepicker-wrapper{
  width: 135px;
  height: 30px;
  padding: 4px,11px,3px
}
.ant-input-affix-wrapper {
  height: 30px;
  padding-bottom:3px;
}
.ant-picker-suffix svg{
    color:black;
}
.ant-picker{
    height: 30px;
    width:90px;
    padding-bottom:3px; 
}
`;
