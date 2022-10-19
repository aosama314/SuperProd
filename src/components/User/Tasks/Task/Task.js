import React, { useState } from "react";
import Styles from "./Task.module.css";

const Task = (props) => {
  const [done, setDone] = useState(false);
  const [editDone, setEditDone] = useState(false);

  const handleDone = () => {
    setDone(true);
    setEditDone(true);
    props.finishEdit(props.dayNumber);
  };

  if (props.edit) {
    console.log("test");
    return (
      <div
        onClick={handleDone}
        className={`d-flex justify-content-center align-items-center flex-column ${Styles["task-card"]}`}
      >
        <h6>Day</h6>
        <h6
          className={
            editDone ? Styles["number-of-day"] : Styles["edit-number-of-day"]
          }
        >
          {props.dayNumber}
        </h6>
      </div>
    );
  }

  return (
    <div
      className={`d-flex justify-content-center align-items-center flex-column ${
        Styles["task-card"]
      } ${props.done ? Styles["done-task"] : ""}`}
    >
      <h6 style={{ color: props.done ? "#FFFFFF" : "black" }}>Day</h6>
      <h6
        className={
          props.done ? Styles["done-task-num-of-day"] : Styles["number-of-day"]
        }
      >
        {props.dayNumber}
      </h6>
    </div>
  );
};

export default Task;
