import React, { useState, useEffect } from "react";

import Styles from "./Todo.module.css";
import Sidebar from "../../common/Sidebar/Sidebar";
import NavBar from "../../Navbar/Navbar";

import { ReactComponent as DoneIcon } from "../../../assets/DoneTodoIcon.svg";
import { ReactComponent as TodayIcon } from "../../../assets/AddTodoIcon.svg";
import { ReactComponent as RemainingIcon } from "../../../assets/RemainingTodoIcon.svg";

import { ReactComponent as DoneSmIcon } from "../../../assets/DoneSmIcon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/DeleteIcon.svg";
import { ReactComponent as EditIcon } from "../../../assets/EditIcon.svg";
import { ReactComponent as RevertIcon } from "../../../assets/RevertIcon.svg";

import CloseIcon from "../../../assets/CloseIcon.png";

import ReactModal from "react-modal";
import axios from "axios";

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

const Todo = () => {
  const [showModal, setShowModal] = useState(false);

  const [todoList, setTodoList] = useState([]);
  const [doneTodoList, setDoneTodoList] = useState([]);

  const [newTodo, setNewTodo] = useState({
    id: "",
    userEmail: localStorage.getItem("userEmail"),
    toDoDetails: "",
  });

  const [todoDetails, setTodoDetails] = useState("");

  const [editMode, setEditMode] = useState(false);

  const handleModalOpening = () => {
    setShowModal(!showModal);
  };

  const handleFetchData = () => {
    axios
      .get(
        `https://localhost:5001/api/ToDo?Email=${localStorage.getItem(
          "userEmail"
        )}`
      )
      .then((res) => {
        if (res.data?.length > 0) {
          setTodoList(res.data.filter((item) => item.status === "Submitted"));
          setDoneTodoList(res.data.filter((item) => item.status === "Done"));
        }
      });
  };

  const handleCreateTodo = () => {
    if (!editMode) {
      const newTodoObject = {
        userEmail: localStorage.getItem("userEmail"),
        toDoDetails: todoDetails,
      };
      setNewTodo(newTodoObject);
      const newTodoArr = todoList;
      newTodoArr.push(newTodoObject);
      axios
        .post("https://localhost:5001/api/ToDo", newTodoObject)
        .then((res) => {
          setTodoList(newTodoArr);
        })
        .finally(() => {
          setTodoDetails("");
          handleFetchData();
          handleModalOpening();
        });
    } else {
      setTodoList(
        todoList.map((item) => {
          if (item.id === newTodo.id) item.toDoDetails = todoDetails;
          return item;
        })
      );

      handleModalOpening();
    }
  };

  const handleChangeTodoDetails = (e) => {
    setTodoDetails(e.target.value);
  };

  const handleTodoDone = (todoObject) => {
    axios
      .post("https://localhost:5001/api/ToDo/Done", {
        userEmail: localStorage.getItem("userEmail"),
        toDoItemId: todoObject.id,
      })
      .then((res) => {
        setDoneTodoList((prevList) => [...prevList, todoObject]);
        setTodoList(todoList.filter((item) => item.id !== todoObject.id));
      });
  };

  const handleTodoRevert = (todoObject) => {
    axios
      .post("https://localhost:5001/api/ToDo/Revert", {
        userEmail: localStorage.getItem("userEmail"),
        toDoItemId: todoObject.id,
      })
      .then((res) => {
        setTodoList((prevList) => [...prevList, todoObject]);
        setDoneTodoList(
          doneTodoList.filter((item) => item.id !== todoObject.id)
        );
      });
  };

  const handleEditTodoDetails = (todoObject) => {
    setEditMode(true);
    handleModalOpening();
    setTodoDetails(todoObject.toDoDetails);
    setNewTodo(todoObject);
  };

  const handleDeleteTodo = (todoObject) => {
    axios
      .post("https://localhost:5001/api/ToDo/Delete", {
        userEmail: localStorage.getItem("userEmail"),
        toDoItemId: todoObject.id,
      })
      .then((res) => {
        setTodoList(todoList.filter((item) => item.id !== todoObject.id));
      });
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <div className={`container-fluid`}>
        <div className="row">
          <div className="col-sm-12 col-md-8 mt-1">
            <div
              className={`row p-4 mt-5 mb-5 ml-md-5 mr-md-1 mx-sm-5 ${Styles["todo-container"]}`}
            >
              <div className="col-sm-12 col-md-12 d-flex justify-content-between mb-3">
                <h3>Todo List</h3>
              </div>

              <div className="col-sm-12 col-md-4 mb-4 mt-3">
                <div className={`${Styles["todo-list"]} p-2`}>
                  <p
                    className={`${Styles["todo-progress"]} ${Styles["today"]}`}
                  >
                    Today Tasks
                    <TodayIcon
                      style={{ cursor: "pointer" }}
                      onClick={handleModalOpening}
                    />
                  </p>
                  {todoList.length > 0
                    ? todoList.map((todoItem, index) => (
                        <div
                          className={`${Styles["todo-item"]} p-2 mt-3`}
                          key={todoItem?.id}
                        >
                          <p>{todoItem?.toDoDetails}</p>
                          <div className="d-flex justify-content-end">
                            <DoneSmIcon
                              style={{ cursor: "pointer" }}
                              onClick={handleTodoDone.bind(this, todoItem)}
                            />
                            <EditIcon
                              className="mx-2"
                              style={{ cursor: "pointer" }}
                              onClick={handleEditTodoDetails.bind(
                                this,
                                todoItem
                              )}
                            />
                            <DeleteIcon
                              style={{ cursor: "pointer" }}
                              onClick={handleDeleteTodo.bind(this, todoItem)}
                            />
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
              <div className="col-sm-12 col-md-4 mb-4 mt-3">
                <div className={`${Styles["todo-list"]} p-2`}>
                  <p className={`${Styles["todo-progress"]} ${Styles["done"]}`}>
                    Done
                    <DoneIcon />
                  </p>
                  {doneTodoList.length > 0
                    ? doneTodoList.map((todoItem, index) => (
                        <div
                          className={`${Styles["todo-item"]} p-2 mt-3`}
                          key={todoItem.id}
                        >
                          <p>{todoItem.toDoDetails}</p>
                          <div className="d-flex justify-content-end">
                            <RevertIcon
                              style={{ cursor: "pointer" }}
                              onClick={handleTodoRevert.bind(this, todoItem)}
                            />
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
              <div className="col-sm-12 col-md-4 mb-4 mt-3">
                <div className={`${Styles["todo-list"]} p-2`}>
                  <p
                    className={`${Styles["todo-progress"]} ${Styles["remaining"]}`}
                  >
                    Remaining
                    <RemainingIcon />
                  </p>
                </div>
              </div>

              {/* <div className="col-sm-12 justify-content-center"></div> */}
            </div>
          </div>

          <div className={`col-sm-12 col-md-4`}>
            <Sidebar />
          </div>

          <ReactModal
            style={customStyles}
            isOpen={showModal}
            contentLabel="Modal #1 Global Style Override Example"
            onRequestClose={handleModalOpening}
          >
            <div className="row">
              <div className="col-md-12 d-flex justify-content-between">
                <p
                  className={`${Styles["todo-progress"]} ${Styles["today"]} ${Styles["modal-header"]}`}
                >
                  Create Today Tasks
                </p>
                <div>
                  <img
                    src={CloseIcon}
                    onClick={handleModalOpening}
                    className={`${Styles["close-modal-icon"]}`}
                  />
                </div>
              </div>
              <div className="col-md-12 d-flex justify-content-center">
                <textarea
                  rows="4"
                  className={Styles["task-area"]}
                  placeholder="Write task here......"
                  onChange={handleChangeTodoDetails}
                  value={todoDetails}
                ></textarea>
              </div>
              <div className="col-md-12 d-flex justify-content-center mt-4">
                <button
                  className={Styles["cancel-btn"]}
                  onClick={handleModalOpening}
                >
                  Cancel
                </button>
                <button
                  className={Styles["create-btn"]}
                  onClick={handleCreateTodo}
                >
                  Create
                </button>
              </div>
            </div>
          </ReactModal>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Todo;
