import React, { useState, forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button } from "antd";

const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin: 0.5em;
  padding: 0.5em;
  border: 1px solid #330000;
`;

const CenterDiv = styled.div`
  display: flex;
  align-items: center;
`;

ListView.propTypes = {
  source: PropTypes.array,
  onDelete: PropTypes.func,
  onEdit : PropTypes.func,
};

function ListView({ source, onDelete, onEdit}, ref) {
  const [EditItemIndex, setEditItemIndex] = useState();

  return (
    <div>
      {source.map(function (item, index) {
        return (
          <div key={index}>
            <List ref={ref}>
              <div>
                <div>{item.name}</div>
                <div>{item.batch}</div>
              </div>
              <div>
                <div>{item.price + "元/件"}</div>
                <div>{item.amount + "件"}</div>
              </div>
              <CenterDiv>{(item.price * item.amount).toFixed(2)}</CenterDiv>
            </List>
            <Button
              type="primary"
              onClick={() => {
                EditItemIndex === index
                  ? setEditItemIndex(null)
                  : setEditItemIndex(index);
              }}
            >
              编辑
            </Button>
            <Button
              type="link"
              onClick={() => {
                onDelete(item.id);
              }}
              style={{ display: EditItemIndex === index ? "inline" : "none" }}
            >
              删除
            </Button>
            <Button
              type="link"
              onClick={() => {
                onEdit(index);
              }}
              style={{ display: EditItemIndex === index ? "inline" : "none" }}
            >
              修改
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default forwardRef(ListView);
