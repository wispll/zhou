import React, { useRef, useCallback } from "react";
import { Calendar, Button } from "antd";
import moment from "moment";
import { RightCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const StyledPlusCircleOutlined = styled(RightCircleOutlined)`
  font-size: 4em;
`;

const StyledButton = styled(Button)`
  display: block;
  margin: 0 auto;
  width: 80px;
  height: 80px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 5%;
`;

export default function Home() {
  const history = useHistory();
  let date = useRef({
    year: moment().year(),
    month: moment().month(),
    day: moment().date(),
  });

  const onChange = useCallback((moment) => {
    date.current = {
      year: moment.year(),
      month: moment.month(),
      day: moment.date(),
    };
  }, []);

  const handleClick = useCallback(() => {
    history.push({
      pathname: "/detail",
      search: `?date=${date.current.month}/${date.current.day}/${date.current.year}`,
      state: {
        date: date.current,
      },
    });
  }, []);

  return (
    <>
      <Calendar defaultValue={moment()} onChange={onChange} fullscreen={ false }/>
      <StyledButton
        type="primary"
        shape="circle"
        onClick={handleClick}
        icon={<StyledPlusCircleOutlined />}
      />
    </>
  );
}
