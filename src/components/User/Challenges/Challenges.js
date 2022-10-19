import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Styles from "./Challenges.module.css";

import AddButtonIcon from "../../../assets/AddButtonIcon.png";
import LaptopImg from "../../../assets/LaptopImg.png";

import Challenge from "./Challenge/Challenge";
import { BiBookOpen, BiBody, BiTime, BiUserCircle } from "react-icons/bi";
import { BsHeart, BsFilePerson, BsArrowUpRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import {
  getChallengesAsync,
  selectChallenges,
  selectChallengesLoading,
  selectChallengesError,
} from "./../../../store/reducers/challenges";
import Loader from "../../common/Loader/Loader";
import {
  getCategoriesAsync,
  selectCategories,
  selectCategoriesLoading,
  selectCategoriesError,
} from "../../../store/reducers/categories";
import NavBar from "../../Navbar/Navbar";

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

const Challenges = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectChallengesSelector = useSelector(selectChallenges);
  const selectChallengesLoadingSelector = useSelector(selectChallengesLoading);
  const selectChallengesErrorSelector = useSelector(selectChallengesError);

  const selectCategoriesSelector = useSelector(selectCategories);
  const selectCategoriesLoadingSelector = useSelector(selectCategoriesLoading);
  const selectCategoriesErrorSelector = useSelector(selectCategoriesError);

  const [activeCategory, setActiveCategory] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(
      selectCategoriesSelector
        ? selectCategoriesSelector.map((cat) => {
            switch (cat) {
              case "Education":
                return { title: cat, icon: BiBookOpen };
              case "Sport":
                return { title: cat, icon: BiBody };
              case "Personal":
                return { title: cat, icon: BsFilePerson };
              case "Health":
                return { title: cat, icon: BsHeart };
              case "Management":
                return { title: cat, icon: BiTime };
              default:
                return { title: cat, icon: BsArrowUpRight };
            }
          })
        : []
    );

    setActiveCategory(
      selectCategoriesSelector ? selectCategoriesSelector[0] : ""
    );
  }, [selectCategoriesSelector]);

  const handleCategorySelection = (catObject) => {
    setActiveCategory(catObject.title);
  };

  console.log(categories);

  useEffect(() => {
    const getChallengesAsyncPromise = dispatch(getChallengesAsync());

    const getCategoriesAsyncPromise = dispatch(getCategoriesAsync());

    return () => {
      getChallengesAsyncPromise.abort();
      getCategoriesAsyncPromise.abort();
    };
  }, [dispatch]);

  const [filteredChallenges, setFilteredChallenges] = useState([]);

  useEffect(() => {
    if (selectChallengesSelector) {
      setFilteredChallenges(
        selectChallengesSelector.filter((challenge) => {
          return activeCategory === "Recommended"
            ? challenge
            : challenge.category === activeCategory;
        })
      );
    }
  }, [setActiveCategory, activeCategory, selectChallengesSelector]);

  const handleChallengeTasks = (challengeObject) => {
    localStorage.setItem("challengeId", challengeObject.id);
    localStorage.setItem("challengeName", challengeObject.name);
    localStorage.setItem("challengeCategory", challengeObject.category);
    navigate("/user/challenge/tasks");
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className={`container-fluid`}>
        <div className="row">
          <div className="col-sm-12 col-md-8 mt-1">
            <div
              className={`row p-4 mt-5 mb-5 ml-md-5 mr-md-1 mx-sm-5 ${Styles["challenges-container"]}`}
            >
              <div className="col-sm-12 col-md-12 d-flex justify-content-between mb-4">
                <h3>Challenges</h3>
                <button
                  className={`${Styles["create-challenge-btn"]}`}
                  onClick={() => navigate("/user/challenge/add")}
                >
                  <img src={AddButtonIcon} className="mr-1 ml-1" />
                  Create Your Own Challenge
                </button>
              </div>

              <div className="col-sm-12 col-md-12 mb-3 mt-4">
                {!selectCategoriesErrorSelector &&
                  !selectCategoriesLoadingSelector &&
                  selectCategoriesSelector &&
                  categories.map((cat, index) => {
                    return (
                      <button
                        key={index}
                        className={`${Styles["challenges-categories-btn"]} ${
                          activeCategory === cat.title
                            ? Styles["active-category"]
                            : ""
                        }`}
                        onClick={handleCategorySelection.bind(this, cat)}
                      >
                        <cat.icon size="16px" className="mr-1" />
                        {cat.title}
                      </button>
                    );
                  })}
              </div>

              <div className="col-sm-12 justify-content-center">
                {selectChallengesLoadingSelector &&
                  !selectChallengesErrorSelector &&
                  !selectChallengesSelector && <Loader />}
              </div>
              {!selectChallengesLoadingSelector &&
                !selectChallengesErrorSelector &&
                selectChallengesSelector &&
                filteredChallenges.map((challenge, index) => (
                  <div
                    key={index}
                    className="col-sm-12 col-md-3 d-flex justify-content-center"
                  >
                    <Challenge
                      title={challenge.name}
                      img={LaptopImg}
                      onClickBtn={handleChallengeTasks.bind(this, challenge)}
                    />
                  </div>
                ))}
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

export default Challenges;
