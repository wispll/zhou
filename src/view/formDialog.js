import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Input } from "antd";
import styled from "styled-components";

const ErrorMessage = styled.span`
  margin-top: 0.5em;
  color: red;
`;

FormDialog.propTypes = {
  visible: PropTypes.bool,
  item: PropTypes.object,
  onClose: PropTypes.func,
  addData: PropTypes.func,
  updateData: PropTypes.func,
};

const placeholder = {
  name: "工序",
  batch: "货号",
  price: "单价",
  amount: "数量",
};

const defaultData = {
  name: "",
  batch: "",
  price: "",
  amount: "",
};

export default function FormDialog(props) {
  const [error, setError] = useState("");
  const [data, setData] = useState({ ...defaultData });

  useEffect(() => {
    setData(
      !props.item || Object.keys(props.item).length === 0
        ? { ...defaultData }
        : props.item
    );
  }, [props.item]);

  const handleChange = (event) => {
    setError("");
    var key = event.target.getAttribute("id");
    var value = event.target.value;
    setData((pre) => {
      pre[key] = value;
      return { ...pre };
    });
  };

  const handleOk = () => {
    for (var key in data) {
      if (data[key] == "") {
        setError(`${placeholder[key]}不能为空`);

        return;
      }
    }

    if (data.id) {
      props.updateData(data);
    } else {
      props.addData(data);
    }
    props.onClose();
  };

  return (
    <>
      <Modal
        title="物料计价"
        visible={props.visible}
        onOk={handleOk}
        onCancel={props.onClose}
      >
        <Input
          id="name"
          value={data.name}
          placeholder={placeholder["name"]}
          onChange={handleChange}
        />
        <Input
          id="batch"
          value={data.batch}
          placeholder={placeholder["batch"]}
          onChange={handleChange}
        />
        <Input
          type="number"
          id="price"
          value={data.price}
          placeholder={placeholder["price"]}
          onChange={handleChange}
        />
        <Input
          type="number"
          id="amount"
          value={data.amount}
          placeholder={placeholder["amount"]}
          onChange={handleChange}
        />
        <ErrorMessage>{error}</ErrorMessage>
      </Modal>
    </>
  );
}
