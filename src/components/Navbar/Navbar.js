import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

import SuperProdLogo from "../../assets/logo.png";
import HomeIcon from "../../assets/HomeIcon.png";
import AboutUsIcon from "../../assets/AboutUsIcon.png";
import TestimonialsIcon from "../../assets/TestimonialsIcon.png";
import BurgerMenuIcon from "../../assets/BurgerMenuIcon.png";
import AchievementsIcon from "../../assets/AchievementsIcon.png";
import RewardsIcon from "../../assets/RewardsIcon.png";
import ChallengesIcon from "../../assets/ChallengesIcon.png";
import useWindowDimensions from "./../../utils/useWindowDimensions";
import {
  selectUser,
  selectUserLoading,
  selectUserError,
  selectUserIsLoggedIn,
} from "../../store/reducers/user";
import Styles from "./Navbar.module.css";
import { BiLogOutCircle } from "react-icons/bi";

const NavBar = () => {
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();
  const [navbarState, setNavbarState] = useState("");
  const [authState, setAuthState] = useState(false);

  const selectUserSelector = useSelector(selectUser);
  const selectUserLoadingSelector = useSelector(selectUserLoading);
  const selectUserErrorSelector = useSelector(selectUserError);
  const selectUserIsLoggedInSelector = useSelector(selectUserIsLoggedIn);

  useEffect(() => {
    navigate(navbarState);
  }, [navbarState]);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setAuthState(true);
    } else {
      setAuthState(false);
    }
  }, [selectUserSelector, selectUserIsLoggedInSelector]);

  const menuItems = (
    <React.Fragment>
      <div
        className="d-flex align-items-center cursor-pointer active-tab"
        onClick={() => {
          if (authState) setNavbarState("/user/challenges");
          else setNavbarState("/");
        }}
      >
        <img src={!authState ? HomeIcon : ChallengesIcon} className="mr-1" />
        <span className={`${Styles["menu-item-font"]}`}>
          {!authState ? "Home" : "Challenges"}
        </span>
      </div>
      <div
        className="d-flex align-items-center cursor-pointer"
        // onClick={() => {
        //   if (authState) setNavbarState("/user/challenges");
        // }}
      >
        <img src={!authState ? AboutUsIcon : RewardsIcon} className="mr-1" />
        <span className={`${Styles["menu-item-font"]}`}>
          {!authState ? "About Us" : "Rewards"}
        </span>
      </div>
      <div className="d-flex align-items-center cursor-pointer">
        <img
          src={!authState ? TestimonialsIcon : AchievementsIcon}
          className="mr-1"
        />
        <span className={`${Styles["menu-item-font"]}`}>
          {!authState ? "Testimonials" : "Achievements"}
        </span>
      </div>
      {authState && (
        <div
          className="d-flex align-items-center cursor-pointer"
          onClick={() => {
            localStorage.clear();
            setNavbarState("/");
          }}
        >
          <BiLogOutCircle fontSize="30px" className="mr-1" />
          <span className={`${Styles["menu-item-font"]}`}>Logout</span>
        </div>
      )}
    </React.Fragment>
  );

  return (
    <div className={`container-fluid pt-3 pb-3`}>
      <div
        className={`row pl-5 pr-5 ${
          width <= 1200 && "justify-content-around"
        } ${Styles["nav-container"]}`}
      >
        {width <= 1200 && (
          <div className="col-sm-1 d-flex justify-content-end align-items-center">
            <Popup
              trigger={<img src={BurgerMenuIcon} className="cursor-pointer" />}
              position="bottom left"
            >
              <div className="d-flex flex-column w-auto">{menuItems}</div>
            </Popup>
          </div>
        )}
        <div
          className={`${
            width > 1200 ? "col-md-4" : "col-sm-8 d-flex justify-content-center"
          }`}
        >
          <img src={SuperProdLogo} />
        </div>
        {width > 1200 && (
          <div className="col-md-4 d-flex justify-content-around">
            {menuItems}
          </div>
        )}
        <div
          className={`${
            width > 1200
              ? "col-md-4 d-flex justify-content-end align-items-center"
              : "col-sm-2 d-flex flex-column"
          }`}
        >
          {!authState ? (
            <>
              <button
                type="button"
                className={`btn btn-danger mr-3 ${Styles.btnWH} ${
                  Styles["menu-item-font"]
                } ${width <= 1200 ? "mb-2" : ""}`}
                onClick={() => setNavbarState("/login")}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`btn btn-outline-dark ${Styles.btnWH} ${Styles["menu-item-font"]}`}
                onClick={() => setNavbarState("/signup")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className={Styles["logged-in"]}>
              {localStorage.getItem("userName")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
