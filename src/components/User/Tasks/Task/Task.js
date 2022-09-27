import React from "react";
import Styles from "./Task.module.css";

const Task = (props) => {
  return (
    <div
      className={`d-flex justify-content-center align-items-center flex-column ${Styles["task-card"]}`}
    >
      <h6>Day</h6>
      <h6 className={Styles["number-of-day"]}>{props.dayNumber}</h6>
    </div>
  );
};

export default Task;
