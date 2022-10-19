import React, { useEffect, useState } from "react";
import axios from "axios";

import Styles from "./Sidebar.module.css";
import { ReactComponent as TopRank } from "../../../assets/TopRank.svg";
import LineImg from "../../../assets/LineImg.svg";
import FemaleImg from "../../../assets/FemaleImg.png";
import UserImg from "../../../assets/UserImg.svg";

const Sidebar = () => {
  const [loadScoreFlag, setLoadScoreFlag] = useState(true);
  const [scoreResponse, setScoreResponse] = useState(null);

  useEffect(() => {
    setLoadScoreFlag(true);
    axios
      .get(
        `https://localhost:5001/api/User?UserEmail=${localStorage.getItem(
          "userEmail"
        )}`
      )
      .then((res) => {
        setScoreResponse(res.data);
      })
      .finally(() => setLoadScoreFlag(false));
  }, [axios]);

  return (
    <div
      className={`row mx-sm-5 ml-md-0 mr-md-5 ${Styles["productivity-container"]}`}
    >
      <div className="col-sm-12 py-4">
        <div className="row">
          <div className="col-sm-12 d-flex flex-column align-items-center mb-3">
            <img src={UserImg} width="88px" className="mt-5" />
            <h5 className="mt-3">{localStorage.getItem("userName")}</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 pl-5">
            <h4 className={`${Styles["monthly-header"]}`}>
              Your Monthly Score
            </h4>
          </div>
          <div className="col-sm-12 mt-4">
            <div className="d-flex justify-content-center">
              <h4 className={Styles["star-container"]}>
                {!loadScoreFlag ? scoreResponse.score : "0"}
              </h4>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-sm-12 mt-5 pl-5">
            <TopRank className="mt-5" />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-sm-12 pl-5">
            <h4 className={`${Styles["monthly-header"]}`}>Top Ranked</h4>
          </div>
        </div>

        {!loadScoreFlag
          ? scoreResponse.topRankers.map((rank, index) => (
              <div className="row mt-4" key={index}>
                <div className="col-sm-12 pl-5 d-flex">
                  <div style={{ paddingTop: "7px" }}>
                    <h4 className={Styles["star-sm-container"]}>{index + 1}</h4>
                    <img
                      src={FemaleImg}
                      style={{ marginLeft: "30px" }}
                      width="32px"
                    />
                  </div>
                  <div>
                    <p className="ml-3 mb-0">{rank.userEmail}</p>
                    <img
                      className="ml-3"
                      src={LineImg}
                      width={`${rank.userScore}%`}
                    />
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Sidebar;
