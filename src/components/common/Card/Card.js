import React from "react";
import useWindowDimensions from "../../../utils/useWindowDimensions";

import Styles from "./Card.module.css";

const Card = ({ imgIcon, textHeader, textContent }) => {
  const { height, width } = useWindowDimensions();

  return (
    <div className={`${Styles["card"]} ${width <= 1150 ? "text-center" : ""}`}>
      <div style={{ margin: "35px auto", width: "90%" }}>
        <img
          src={imgIcon}
          alt={textHeader}
          style={{ width: "100px", height: "100px" }}
        />
        <h4
          className={`${Styles["card-text-header"]} mt-3 mb-3 ${
            width <= 1315 ? Styles["card-text-header-md"] : ""
          }`}
        >
          {textHeader}
        </h4>
        <p
          className={`${Styles["card-text-content"]} ${
            width <= 1315 ? Styles["card-text-content-md"] : ""
          }`}
        >
          {textContent}
        </p>
      </div>
    </div>
  );
};

export default Card;
