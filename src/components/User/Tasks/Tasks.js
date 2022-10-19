import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getChallengeTasksAsync,
  finishTodayTaskAsync,
  selectTasks,
  selectTasksError,
  selectTasksLoading,
} from "../../../store/reducers/challengeTasks";
import Task from "./Task/Task";
import Styles from "./Tasks.module.css";

import CloseIcon from "../../../assets/CloseIcon.png";
import NoPermissionImg from "../../../assets/NoPermissionImg.svg";

import ReactModal from "react-modal";
import NavBar from "../../Navbar/Navbar";

ReactModal.defaultStyles.overlay.background = "hsla(0, 0%, 0%, 0.25)";

ReactModal.defaultStyles.overlay.overflow = "auto";

const customStyles = {
  content: {
    height: "300px",
    borderRadius: "30px",
    overflow: "visible",
    margin: "200px auto",
    width: "55%",
  },
};

const Tasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectTasksSelector = useSelector(selectTasks);
  const selectTasksLoadingSelector = useSelector(selectTasksLoading);
  const selectTasksErrorSelector = useSelector(selectTasksError);

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [isDone, setIsDone] = useState(false);
  const [prevDone, setPrevDone] = useState(false);
  const [availableTodayTask, setAvailableTodayTask] = useState(true);

  const handleModalOpening = () => {
    setShowModal(!showModal);
  };

  const handleTaskSelection = (day) => {
    setSelectedTask(day);
    setIsDone(day.done);

    const prevTask = arrOfDays[day.dayNumber - 2];
    setPrevDone(prevTask ? prevTask.done : true);

    const prevTaskDate =
      prevTask && new Date(prevTask.date).toISOString().substring(0, 10);

    const todayDate = new Date().toISOString().substring(0, 10);

    if (prevTask && prevTask.done && prevTaskDate === todayDate) {
      setAvailableTodayTask(false);
    } else if (prevTask && !prevTask.done) {
      setAvailableTodayTask(false);
    } else if (!prevTask && day.order === 1) {
      setAvailableTodayTask(true);
    } else {
      setAvailableTodayTask(true);
    }

    handleModalOpening();
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
      return {
        dayNumber: task.order,
        task: task.task,
        taskId: task.id,
        done: task.done,
        date: task.date,
      };
    });

  const finishTodayTask = () => {
    const tasksRequestQueryObject = {
      userEmail: localStorage.getItem("userEmail"),
      taskId: selectedTask.taskId,
    };
    dispatch(finishTodayTaskAsync(tasksRequestQueryObject));
    handleModalOpening();
    navigate("/user/challenges");
  };

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
                onClick={handleTaskSelection.bind(this, day)}
                className="col-sm-3 col-md-2"
              >
                <Task dayNumber={day.dayNumber} done={day.done} />
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
              {availableTodayTask ? (
                <>
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
                    {!isDone ? (
                      <button
                        onClick={finishTodayTask}
                        className={`${Styles["red-btn"]}`}
                      >
                        Done
                      </button>
                    ) : (
                      <button
                        onClick={handleModalOpening}
                        className={`${Styles["red-btn"]}`}
                      >
                        Task is done
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div
                  className={`col-md-12 d-flex flex-column justify-content-center align-items-center mt-3`}
                >
                  <img
                    style={{
                      marginTop: "-115px",
                      borderRadius: "50%",
                      border: "5px solid white",
                    }}
                    src={NoPermissionImg}
                  />
                  <h6 className={`pt-5 ${Styles["task-modal-header"]}`}>
                    No Permission
                  </h6>
                  <h6 className={`${Styles["task-modal-title"]} mt-3 mb-3`}>
                    You don’t have permission to view this challenge, come back
                    on next days
                  </h6>
                </div>
              )}
            </div>
          </ReactModal>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tasks;
