import React, {
  useState,
  useCallback,
  useEffect,
  createRef,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styled from "styled-components";
import FormDialog from "../view/formDialog";
import ListView from "../view/list";
import { openDB, get, add, remove, update } from "../db/dao";

const StyledPlusCircleOutlined = styled(PlusCircleOutlined)`
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

export default function Detail() {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const listView = createRef();
  const location = useLocation();
  let editIngItem = useRef();

  const showDialog = useCallback(() => {
    setIsDialogVisible(true);
  }, []);

  const closeDialog = useCallback(() => {
    editIngItem.current = undefined;
    setIsDialogVisible(false);
  }, []);

  const addData2DB = useCallback((v) => {
    openDB(() => {
      add(
        () => {
          getData();
        },
        { ...v, ...location.state.date }
      );
    });
  }, []);

  const deleteDataFromDB = useCallback((key) => {
    openDB(() => {
      remove(() => {
        getData();
      }, key);
    });
  }, []);

  const updateDataFromDB = useCallback((item) => {
    openDB(() => {
      update(() => {
        getData();
      }, item);
    });
  }, []);

  const handleOnEdit = useCallback((index) => {
    editIngItem.current = dataArray[index];
    showDialog();
  });

  useEffect(() => {
    openDB(() => {
      getData();
    });
  }, []);

  useEffect(() => {
    if (listView.current)
      listView.current.scrollIntoView({ behavior: "smooth" });
  }, [dataArray]);

  const getData = function () {
    get((result) => {
      setDataArray(result);
    }, location.state.date);
  };

  return (
    <>
      <ListView
        source={dataArray}
        onDelete={deleteDataFromDB}
        onEdit={handleOnEdit}
        ref={(el) => {
          listView.current = el;
        }}
      />
      <FormDialog
        visible={isDialogVisible}
        onClose={closeDialog}
        addData={addData2DB}
        updateData={updateDataFromDB}
        item={{ ...editIngItem.current }}
      />
      <StyledButton
        type="primary"
        shape="circle"
        onClick={showDialog}
        icon={<StyledPlusCircleOutlined />}
      />
    </>
  );
}
