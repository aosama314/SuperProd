import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../../Navbar/Navbar";

import Styles from "./AddChallenge.module.css";

import StarImg from "../../../../assets/StarImgSm.svg";
import Task from "./../../Tasks/Task/Task";
import ReactModal from "react-modal";
import CloseIcon from "../../../../assets/CloseIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "./../../../../store/reducers/categories";
import { useNavigate } from "react-router-dom";

import { BiBookOpen, BiBody, BiTime } from "react-icons/bi";
import {
  BsHeart,
  BsFilePerson,
  BsArrowUpRight,
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { createCustomChallenge } from "../../../../store/reducers/challenges";

ReactModal.defaultStyles.overlay.background = "hsla(0, 0%, 0%, 0.25)";

ReactModal.defaultStyles.overlay.overflow = "auto";

const customStyles = {
  content: {
    height: "480px",
    borderRadius: "30px",
    overflow: "visible",
    margin: "100px auto",
    width: "55%",
  },
};

const AddChallenge = () => {
  const taskDetailsRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [arrOfDays, setArrOfDays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const categoriesSelector = useSelector(selectCategories);
  const [challengeDesc, setChallengeDesc] = useState("");
  const [challengeTitle, setChallengeTitle] = useState("");

  const [selectedDay, setSelectedDay] = useState();

  const handleModalOpening = () => {
    setShowModal(!showModal);
  };

  const handleEditedDone = (dayOrder) => {
    handleModalOpening();
    // const newDaysArr = arrOfDays;
    // newDaysArr[dayOrder - 1].done = true;
    const selectedDay = arrOfDays[dayOrder - 1];
    setSelectedDay(selectedDay);
    // setArrOfDays(newDaysArr);
  };

  const handleCategorySelection = (catObject) => {
    setActiveCategory(catObject.title);
  };

  useEffect(() => {
    let days = [];
    for (let i = 0; i < 21; i++) {
      days.push({
        order: i + 1,
        done: false,
        taskDetails: "",
      });
    }

    setArrOfDays(days);
  }, []);

  const setTaskDetails = () => {
    const newDaysArr = arrOfDays;
    newDaysArr[selectedDay.order - 1].taskDetails =
      taskDetailsRef.current.value;
    newDaysArr[selectedDay.order - 1].done = true;
    setArrOfDays(newDaysArr);
  };

  const setChangeDayPrevNext = (condition) => {
    switch (condition) {
      case "+":
        if (selectedDay?.order === 21) return;
        setSelectedDay(arrOfDays[selectedDay.order]);
        break;
      case "-":
        if (selectedDay?.order === 1) return;
        setSelectedDay(arrOfDays[selectedDay.order - 2]);
        break;
    }
  };

  useEffect(() => {
    setCategories(
      categoriesSelector
        ? categoriesSelector.map((cat) => {
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
  }, [categoriesSelector]);

  if (categoriesSelector.length === 0) {
    navigate("/user/challenges");
    return;
  }

  const cancelCreation = () => {
    navigate("/user/challenges");
  };

  const createBtnHandler = () => {
    const requestObject = {
      name: challengeTitle,
      category: activeCategory,
      challengeTasks: [],
    };
    const arrOfCompletedTasks = arrOfDays.map((day) => {
      delete day.done;
      return day;
    });
    requestObject.challengeTasks = arrOfCompletedTasks;

    dispatch(createCustomChallenge(requestObject));

    console.log(requestObject);
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className={`container-fluid pl-5 pr-5`}>
        <div className="row px-3">
          <div className="col-md-12 d-flex align-items-baseline">
            <img src={StarImg} className="mr-2" />
            <h3
              style={{ fontWeight: "700" }}
              className={Styles["container-header"]}
            >
              Create your own challenge.
            </h3>
          </div>
        </div>
        <div className={`row mx-3 ${Styles["challenge-container"]}`}>
          <div className="col-md-12">
            <div className={`row p-4`}>
              <div className="col-xs-12 col-md-3 pl-0">
                <input
                  type="text"
                  className={Styles["challenge-title"]}
                  placeholder="Challenge Title"
                  onChange={(e) => {
                    setChallengeTitle(e.target.value);
                  }}
                />
              </div>
              <div
                className={`col-xs-12 col-md-9 d-flex align-items-center ${Styles["cats-container"]}`}
              >
                {categoriesSelector &&
                  categories.map((cat, index) => {
                    return (
                      <button
                        key={index}
                        className={`${Styles["challenge-cat"]} ${
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
            </div>
          </div>
          <div className="col-md-12">
            <div className="row px-4 pb-4">
              <div className="col-md-12 px-0">
                <input
                  type="text"
                  className={`${Styles["challenge-desc"]}`}
                  placeholder="Challenge Description"
                  onChange={(e) => {
                    setChallengeDesc(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`row mx-3 mt-5 ${Styles["tasks-container"]}`}>
          <div className="col-md-12">
            <div className="row p-4">
              <h3 className={Styles["container-header"]}>
                Write Challenge tasks
              </h3>
            </div>

            <div className="row p-4">
              {arrOfDays &&
                arrOfDays.map((day) => (
                  <div key={day.order} className="col-sm-3 col-md-2">
                    <Task
                      finishEdit={handleEditedDone}
                      dayNumber={day.order}
                      done={day.done}
                      edit={true}
                      task={day}
                    />
                  </div>
                ))}
            </div>

            <ReactModal
              style={customStyles}
              isOpen={showModal}
              contentLabel="Modal #1 Global Style Override Example"
              onRequestClose={handleModalOpening}
            >
              <div className="row">
                <div className="col-md-12 d-flex justify-content-end">
                  <img
                    src={CloseIcon}
                    onClick={handleModalOpening}
                    className={`${Styles["close-modal-icon"]}`}
                  />
                </div>
                <div className="col-md-12 d-flex justify-content-center">
                  <h6 className={`${Styles["task-modal-header"]}`}>
                    Day {selectedDay?.order}
                  </h6>
                </div>
                <div className="col-md-12 d-flex justify-content-center mt-4">
                  <h6 className={`${Styles["task-modal-body"]}`}>
                    Write the challenge task
                  </h6>
                </div>
                <div className="col-md-12 text-center mt-4">
                  <textarea
                    ref={taskDetailsRef}
                    rows="4"
                    className={Styles["task-area"]}
                    placeholder="Write task here......"
                    onChange={setTaskDetails}
                  ></textarea>
                </div>
                <div className="col-md-12 d-flex justify-content-around mt-4">
                  <div
                    className="d-flex cursor-pointer"
                    onClick={setChangeDayPrevNext.bind(this, "-")}
                  >
                    <BsFillArrowLeftSquareFill
                      className={`${Styles["arrow"]} ${
                        selectedDay?.order !== 1 ? Styles["next-prev-task"] : ""
                      }`}
                    />
                    <h6 className={`${Styles["change-task"]}`}>Previous</h6>
                  </div>
                  <div
                    className="d-flex cursor-pointer"
                    onClick={setChangeDayPrevNext.bind(this, "+")}
                  >
                    <h6 className={Styles["change-task"]}>Next </h6>
                    <BsFillArrowRightSquareFill
                      className={`${Styles["arrow"]} ${
                        selectedDay?.order !== 21
                          ? Styles["next-prev-task"]
                          : ""
                      }`}
                    />
                  </div>
                </div>
                <div className="col-md-12 d-flex justify-content-center mt-4">
                  <button
                    className={Styles["save-btn"]}
                    onClick={handleModalOpening}
                  >
                    Save
                  </button>
                </div>
              </div>
            </ReactModal>
          </div>
        </div>

        <div className="row p-4 mt-3">
          <div className="col-sm-12 d-flex justify-content-end">
            <button className={Styles["cancel-btn"]} onClick={cancelCreation}>
              Cancel
            </button>
            <button className={Styles["create-btn"]} onClick={createBtnHandler}>
              Create
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddChallenge;
