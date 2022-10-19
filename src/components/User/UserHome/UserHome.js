import React from "react";
import Styles from "./UserHome.module.css";

import NavBar from "./../../Navbar/Navbar";
import LaptopImg from "../../../assets/LaptopImg.png";

import Challenge from "../Challenges/Challenge/Challenge";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar/Sidebar";

const nthOfDays = (d) => {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const dateFormatter = () => {
  const today = new Date();
  return (
    today.toString().split(" ")[0] +
    " " +
    today.toString().split(" ")[1] +
    " " +
    today.toString().split(" ")[2] +
    nthOfDays(today.toString().split(" ")[2])
  );
};

const UserHome = () => {
  const navigate = useNavigate();

  const handleChangeModule = (selectedModule) => {
    navigate(`/user/${selectedModule}`);
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className={`container-fluid`}>
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <div
              className={`row mt-5 mb-5 ml-md-5 mr-md-1 mx-sm-5 ${Styles["challenges-header-row"]}`}
            >
              <div
                className={`col-md-12 p-4 ${Styles["challenges-header-text-color"]}`}
              >
                <h1 className="mb-4 mt-4">
                  Hello, {localStorage.getItem("userName")}
                </h1>
                <h3 className="mt-4 mb-4"> {dateFormatter()} </h3>
                <p className="mt-4 mb-4">
                  "Let today be the start of something new."
                </p>
              </div>
            </div>

            <div
              className={`row p-4 mt-5 mb-5 ml-md-5 mr-md-1 mx-sm-5 ${Styles["challenges-container"]}`}
            >
              <div
                key={1}
                className="col-sm-12 col-md-4 d-flex justify-content-center"
              >
                <Challenge
                  className={`w-100 ${Styles["challenge-height"]}`}
                  imgClassName={Styles["img-styles"]}
                  title={"Challenges"}
                  img={LaptopImg}
                  onClickBtn={handleChangeModule.bind(this, "challenges")}
                />
              </div>
              <div
                key={1}
                className="col-sm-12 col-md-4 d-flex justify-content-center"
              >
                <Challenge
                  className={`w-100 ${Styles["challenge-height"]}`}
                  title={"Todo List"}
                  imgClassName={Styles["img-styles"]}
                  img={LaptopImg}
                  onClickBtn={handleChangeModule.bind(this, "todo")}
                />
              </div>
              <div
                key={1}
                className="col-sm-12 col-md-4 d-flex justify-content-center"
              >
                <Challenge
                  className={`w-100 ${Styles["challenge-height"]}`}
                  title={"Events"}
                  imgClassName={Styles["img-styles"]}
                  img={LaptopImg}
                  onClickBtn={handleChangeModule.bind(this, "events")}
                />
              </div>
              <div
                key={1}
                className="col-sm-12 col-md-4 d-flex justify-content-center"
              >
                <Challenge
                  className={`w-100 ${Styles["challenge-height"]}`}
                  title={"How to Focus"}
                  imgClassName={Styles["img-styles"]}
                  img={LaptopImg}
                  //   onClickBtn={handleChallengeTasks.bind(this, challenge)}
                />
              </div>
              <div
                key={1}
                className="col-sm-12 col-md-4 d-flex justify-content-center"
              >
                <Challenge
                  className={`w-100 ${Styles["challenge-height"]}`}
                  title={"Appointment session"}
                  imgClassName={Styles["img-styles"]}
                  img={LaptopImg}
                  //   onClickBtn={handleChallengeTasks.bind(this, challenge)}
                />
              </div>
              <div
                key={1}
                className="col-sm-12 col-md-4 d-flex justify-content-center"
              >
                <Challenge
                  className={`w-100 ${Styles["challenge-height"]}`}
                  title={"Take Advice"}
                  imgClassName={Styles["img-styles"]}
                  img={LaptopImg}
                  //   onClickBtn={handleChallengeTasks.bind(this, challenge)}
                />
              </div>
            </div>
          </div>

          <div className={`col-sm-12 col-md-4`}>
            <Sidebar />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserHome;
