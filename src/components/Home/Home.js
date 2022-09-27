import React from "react";

import Styles from "./Home.module.css";
import HomeImg from "../../assets/HomeImg.png";
import NavBar from "./../Navbar/Navbar";
import useWindowDimensions from "./../../utils/useWindowDimensions";
import Card from "../common/Card/Card";
import StarIcon from "../../assets/StarIcon.png";
import DailyNotesIcon from "../../assets/DailyNotesIcon.png";
import NotificationIcon from "../../assets/NotificationIcon.png";

const Home = () => {
  const { height, width } = useWindowDimensions();

  return (
    <React.Fragment>
      <NavBar />

      <div className={`container-fluid pt-3 pb-3 ${Styles["container-bg"]}`}>
        <div className={`row pl-5 pr-5 mt-5 pt-5`}>
          <div
            className={`${width >= 1000 ? "col-md-7" : "col-sm-12"} pt-5 mt-5`}
          >
            <h3 className={`${Styles["header-styles"]}`}>
              SUPER
              <span className="text-danger ml-2">PROD!</span>
            </h3>
            <p
              className={`${Styles["p-styles"]} ${
                width > 1300 ? "text-width" : ""
              }`}
            >
              It's time for living the life you love! Create your ideal life
              with life changing habits and be the best version of yourself!
            </p>
            <p className={`${Styles["span-styles"]}`}>Let’s Start With US</p>
            <button className={`${Styles["start-btn-styles"]} mt-4`}>
              Start
            </button>
          </div>
          <div className={`${width >= 1000 ? "col-md-5" : "col-sm-12"}`}>
            <div>
              <img src={HomeImg} style={{ width: "100%" }} />
            </div>
          </div>
        </div>

        <div className={`row pl-5 pr-5 mt-5 `}>
          <div className="col-sm-12 d-flex flex-column justify-content-center align-items-center">
            <h4 className={`${Styles["header-styles"]} mb-5`}>About Us</h4>
            <p className={`${Styles["p-styles"]} text-center`}>
              How Does The 21 Day Challenge Work?
            </p>
            <p
              className={`${Styles["span-styles"]} text-center`}
              style={width > 1100 ? { width: "972.38px" } : {}}
            >
              Introducing the 21-Day Challenge Trial Program.This is a
              self-initiated program where you stick to a certain habit for 21
              days, every day.
            </p>
          </div>
        </div>

        <div className={`row pl-5 pr-5 mt-5 `}>
          <div className={`col-sm-12 col-md-4`}>
            <Card
              imgIcon={StarIcon}
              textHeader="Choose the best challenge for you"
              textContent="Or create your own, do it for 21 days, and track your habits."
            />
          </div>
          <div className={`col-sm-12 col-md-4`}>
            <Card
              imgIcon={DailyNotesIcon}
              textHeader="Daily journal"
              textContent="Write your everyday thoughts and track your mood."
            />
          </div>
          <div className={`col-sm-12 col-md-4`}>
            <Card
              imgIcon={NotificationIcon}
              textHeader="Motivational notifications"
              textContent="You'll receive daily notifications to help you achieve your goals"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
