import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getChallengeTasksAsync,
  selectTasks,
  selectTasksError,
  selectTasksLoading,
} from "../../../store/reducers/challengeTasks";
import Task from "./Task/Task";
import Styles from "./Tasks.module.css";

import CloseIcon from "../../../assets/CloseIcon.png";

import ReactModal from "react-modal";
import NavBar from "../../Navbar/Navbar";

ReactModal.defaultStyles.overlay.background =
  "linear-gradient(123.74deg, rgba(230, 0, 0, 0.84) 63.8%, #FFB6B6 114.12%)";

ReactModal.defaultStyles.overlay.overflow = "auto";

const customStyles = {
  content: {
    // top: "15%",
    // left: "25%",
    // right: "25%",
    // bottom: "25%",
    // marginRight: "-50%",
    // width: "841.93px",
    height: "300px",
    borderRadius: "30px",
    overflow: "auto",
  },
};

const Tasks = () => {
  const dispatch = useDispatch();

  const selectTasksSelector = useSelector(selectTasks);
  const selectTasksLoadingSelector = useSelector(selectTasksLoading);
  const selectTasksErrorSelector = useSelector(selectTasksError);
  console.log(selectTasksSelector);

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  const handleModalOpening = () => {
    setShowModal(!showModal);
  };

  const handleSelectTask = (task) => {
    console.log(task);
    setSelectedTask(task);
  };

  useEffect(() => {
    const tasksRequestQueryObject = {
      userEmail: localStorage.getItem("userEmail"),
      challengeId: localStorage.getItem("challengeId"),
    };
    dispatch(getChallengeTasksAsync(tasksRequestQueryObject));
  }, [dispatch]);

  const arrOfDays =
    selectTasksSelector &&
    selectTasksSelector.map((task, index) => {
      return { dayNumber: index + 1, task: task.task, taskId: task.id };
    });

  return (
    <React.Fragment>
      <NavBar />

      <div className={`container`}>
        <div className={`row mt-5 mb-5 ${Styles["tasks-header-row"]}`}>
          <div className={`col-md-12 p-4 ${Styles["tasks-header-text-color"]}`}>
            <h1 className="mb-4 mt-4">
              {localStorage.getItem("challengeCategory")}
            </h1>
            <h3 className="mt-4 mb-4">
              {localStorage.getItem("challengeName")}
            </h3>
            <p className="mt-4 mb-4">
              "Let today be the start of something new."
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row mt-5 mb-5">
          {selectTasksSelector &&
            arrOfDays.map((day, index) => (
              <div
                key={index}
                onClick={() => {
                  handleModalOpening();
                  handleSelectTask(day);
                }}
                className="col-sm-3 col-md-2"
              >
                <Task dayNumber={day.dayNumber} />
              </div>
            ))}

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
              <div
                className={`col-md-12 d-flex flex-column justify-content-center align-items-center mt-3`}
              >
                <h6 className={`${Styles["task-modal-header"]}`}>
                  Day {selectedTask.dayNumber}
                </h6>
                <h6 className={`${Styles["task-modal-title"]} mt-3 mb-3`}>
                  {selectedTask.task}
                </h6>
              </div>
              <div
                className={`col-md-12 d-flex justify-content-center ${Styles["btn-container"]}`}
              >
                <button onClick={handleModalOpening}>Back</button>
                <button className={`${Styles["red-btn"]}`}>Done</button>
              </div>
            </div>
          </ReactModal>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tasks;
