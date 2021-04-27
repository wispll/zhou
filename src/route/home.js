import React, { useRef, useCallback } from "react";
import { Calendar, Button } from "antd";
import moment from "moment";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { openDB, get } from "../db/dao";

const BottomDiv = styled.div`
  display: flex;
  justify-content: space-around;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 5%;
`;

const StyledButton = styled(Button)`
  width: 4em;
  height: 4em;
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

  const handleRecordClick = useCallback(() => {
    history.push({
      pathname: "/detail",
      search: `?date=${date.current.month}/${date.current.day}/${date.current.year}`,
      state: {
        date: date.current,
      },
    });
  }, []);

  const handleExportClick = useCallback(() => {
    // eslint-disable-next-line no-unused-vars
    let { day, ...rest } = date.current;
    openDB(() => {
      get((result) => {
        window.androidAssistant.save(toCsv(result));
      }, rest);
    });
  });

  function toCsv(array) {
    if (array === undefined || array.length == 0) {
      return "";
    }
    let set = {};
    array.forEach((value) => {
      let key = value.name + value.batch;
      if (set[key]) {
        set[key].amount = +set[key].amount + +value.amount;
      } else {
        set[key] = value;
      }
    });

    let totalPrice = null;
    let csv = "";
    csv = csv.concat(+date.current.month + 1, "_", date.current.year, "##");
    csv = csv.concat("工序,货号,单价,数量,总价").concat("\r\n");
    for (let key in set) {
      let value = set[key];
      let batchPrice = value.amount * value.price;
      totalPrice += batchPrice;
      csv = csv
        .concat(
          `${value.name},${value.batch},${value.price},${value.amount},${batchPrice}`
        )
        .concat("\r\n");
    }

    csv = csv.concat(`总价,,,,${totalPrice}`);
    return csv;
  }

  return (
    <>
      <Calendar
        defaultValue={moment()}
        onChange={onChange}
        fullscreen={false}
      />
      <BottomDiv>
        <StyledButton type="primary" shape="circle" onClick={handleRecordClick}>
          记录
        </StyledButton>
        <StyledButton type="primary" shape="circle" onClick={handleExportClick}>
          导出
        </StyledButton>
      </BottomDiv>
    </>
  );
}
