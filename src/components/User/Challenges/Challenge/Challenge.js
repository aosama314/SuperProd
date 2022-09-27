import React from "react";
import Styles from "./Challenge.module.css";

const Challenge = (props) => {
  return (
    <div
      className={`d-flex flex-column align-items-center pt-3 ${Styles["challenge-card"]} m-2`}
    >
      <h6>{props.title}</h6>
      <img src={props.img} width="83px" />
      <button
        className={`${Styles["start-challenge-btn"]} mt-3`}
        onClick={props.onClickBtn}
      >
        Start
      </button>
    </div>
  );
};

export default Challenge;
