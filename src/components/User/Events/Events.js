import React, { useState } from "react";

import Styles from "./Events.module.css";
import NavBar from "./../../Navbar/Navbar";
import Sidebar from "./../../common/Sidebar/Sidebar";

import { BiBookOpen, BiBody, BiTime, BiUserCircle } from "react-icons/bi";
import { BsHeart, BsFilePerson, BsArrowUpRight } from "react-icons/bs";

import UserImg from "../../../assets/UserImg.svg";
import WorldSmIcon from "../../../assets/WorldSmIcon.svg";
import ClockIcon from "../../../assets/OClockIcon.svg";
import CalendarIcon from "../../../assets/CalendarIcon.svg";

const Events = () => {
  const [categories] = useState([
    { title: "Recommended", icon: BsArrowUpRight },
    { title: "Education", icon: BiBookOpen },
    { title: "Sport", icon: BiBody },
    { title: "Personal", icon: BsFilePerson },
  ]);
  const [activeCategory, setActiveCategory] = useState("Recommended");

  const handleCategorySelection = (catObject) => {
    setActiveCategory(catObject.title);
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className={`container-fluid`}>
        <div className="row">
          <div className="col-sm-12 col-md-8 mt-1">
            <div
              className={`row p-4 mt-5 mb-5 ml-md-5 mr-md-1 mx-sm-5 ${Styles["events-container"]}`}
            >
              <div className="col-sm-12 col-md-12 d-flex justify-content-between mb-3">
                <h3>Events</h3>
              </div>

              <div className="col-sm-12 col-md-12 mb-0 mt-4 pl-2">
                {categories.map((cat, index) => {
                  return (
                    <button
                      key={index}
                      className={`${Styles["events-categories-btn"]} ${
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

              <div className={`col-sm-12 col-md-6 mt-4`}>
                <div className={`${Styles["event-item"]} p-3`}>
                  <div className={`d-flex`}>
                    <img src={UserImg} width="40px" />
                    <p className={`pt-2 ml-3`}>Ahmed Mohammed</p>
                  </div>
                  <div>
                    <p className={`pt-2 mb-0 ${Styles["gray-text"]}`}>
                      Running, Walking
                    </p>
                  </div>
                  <div className="d-flex">
                    <img src={WorldSmIcon} />
                    <span className={`ml-2 ${Styles["gray-text"]}`}>
                      Rehab 1
                    </span>
                  </div>
                  <div
                    className="d-flex justify-content-between"
                    style={{ width: "85%" }}
                  >
                    <div>
                      <img src={CalendarIcon} style={{ marginLeft: "2px" }} />
                      <span className={`ml-2 ${Styles["gray-text"]}`}>
                        03 OCT 2022 (Sun)
                      </span>
                    </div>
                    <div>
                      <img src={ClockIcon} style={{ marginLeft: "2px" }} />
                      <span className={`ml-2 ${Styles["gray-text"]}`}>
                        8:00 AM - 12:00 PM
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <div>
                      <span className={`${Styles["gray-text"]}`}>
                        +20 Joined
                      </span>
                    </div>
                    <div>
                      <button className={Styles["event-details-btn"]}>
                        Show details
                      </button>
                      <button className={Styles["join-event-btn"]}>Join</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`col-sm-12 col-md-6 mt-4`}>
                <div className={`${Styles["event-item"]} p-3`}>
                  <div className={`d-flex`}>
                    <img src={UserImg} width="40px" />
                    <p className={`pt-2 ml-3`}>Ahmed Mohammed</p>
                  </div>
                  <div>
                    <p className={`pt-2 mb-0 ${Styles["gray-text"]}`}>
                      Running, Walking
                    </p>
                  </div>
                  <div className="d-flex">
                    <img src={WorldSmIcon} />
                    <span className={`ml-2 ${Styles["gray-text"]}`}>
                      Rehab 1
                    </span>
                  </div>
                  <div
                    className="d-flex justify-content-between"
                    style={{ width: "85%" }}
                  >
                    <div>
                      <img src={CalendarIcon} style={{ marginLeft: "2px" }} />
                      <span className={`ml-2 ${Styles["gray-text"]}`}>
                        03 OCT 2022 (Sun)
                      </span>
                    </div>
                    <div>
                      <img src={ClockIcon} style={{ marginLeft: "2px" }} />
                      <span className={`ml-2 ${Styles["gray-text"]}`}>
                        8:00 AM - 12:00 PM
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <div>
                      <span className={`${Styles["gray-text"]}`}>
                        +20 Joined
                      </span>
                    </div>
                    <div>
                      <button className={Styles["event-details-btn"]}>
                        Show details
                      </button>
                      <button className={Styles["join-event-btn"]}>Join</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`col-sm-12 col-md-6 mt-4`}>
                <div className={`${Styles["event-item"]} p-3`}>
                  <div className={`d-flex`}>
                    <img src={UserImg} width="40px" />
                    <p className={`pt-2 ml-3`}>Ahmed Mohammed</p>
                  </div>
                  <div>
                    <p className={`pt-2 mb-0 ${Styles["gray-text"]}`}>
                      Running, Walking
                    </p>
                  </div>
                  <div className="d-flex">
                    <img src={WorldSmIcon} />
                    <span className={`ml-2 ${Styles["gray-text"]}`}>
                      Rehab 1
                    </span>
                  </div>
                  <div
                    className="d-flex justify-content-between"
                    style={{ width: "85%" }}
                  >
                    <div>
                      <img src={CalendarIcon} style={{ marginLeft: "2px" }} />
                      <span className={`ml-2 ${Styles["gray-text"]}`}>
                        03 OCT 2022 (Sun)
                      </span>
                    </div>
                    <div>
                      <img src={ClockIcon} style={{ marginLeft: "2px" }} />
                      <span className={`ml-2 ${Styles["gray-text"]}`}>
                        8:00 AM - 12:00 PM
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <div>
                      <span className={`${Styles["gray-text"]}`}>
                        +20 Joined
                      </span>
                    </div>
                    <div>
                      <button className={Styles["event-details-btn"]}>
                        Show details
                      </button>
                      <button className={Styles["join-event-btn"]}>Join</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`col-sm-12 col-md-6 mt-4`}>
                <div className={`${Styles["event-item"]} p-3`}>
                  <div className={`d-flex`}>
                    <img src={UserImg} width="40px" />
                    <p className={`pt-2 ml-3`}>Ahmed Mohammed</p>
                  </div>
                  <div>
                    <p className={`pt-2 mb-0 ${Styles["gray-text"]}`}>
                      Running, Walking
                    </p>
                  </div>
                  <div className="d-flex">
                    <img src={WorldSmIcon} />
                    <span className={`ml-2 ${Styles["gray-text"]}`}>
                      Rehab 1
                    </span>
                  </div>
                  <div
                    className="d-flex justify-content-between"
                    style={{ width: "85%" }}
                  >
                    <div>
                      <img src={CalendarIcon} style={{ marginLeft: "2px" }} />
                      <span className={`ml-2 ${Styles["gray-text"]}`}>
                        03 OCT 2022 (Sun)
                      </span>
                    </div>
                    <div>
                      <img src={ClockIcon} style={{ marginLeft: "2px" }} />
                      <span className={`ml-2 ${Styles["gray-text"]}`}>
                        8:00 AM - 12:00 PM
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <div>
                      <span className={`${Styles["gray-text"]}`}>
                        +20 Joined
                      </span>
                    </div>
                    <div>
                      <button className={Styles["event-details-btn"]}>
                        Show details
                      </button>
                      <button className={Styles["join-event-btn"]}>Join</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`col-sm-12 col-md-6 mt-4`}>
                <div className={`${Styles["event-item"]} p-3`}>
                  <div className={`d-flex`}>
                    <img src={UserImg} width="40px" />
                    <p className={`pt-2 ml-3`}>Ahmed Mohammed</p>
                  </div>
                  <div>
                    <p className={`pt-2 mb-0 ${Styles["gray-text"]}`}>
                      Running, Walking
                    </p>
                  </div>
                  <div className="d-flex">
                    <img src={WorldSmIcon} />
                    <span className={`ml-2 ${Styles["gray-text"]}`}>
                      Rehab 1
                    </span>
                  </div>
                  <div
                    className="d-flex justify-content-between"
                    style={{ width: "85%" }}
                  >
                    <div>
                      <img src={CalendarIcon} style={{ marginLeft: "2px" }} />
                      <span className={`ml-2 ${Styles["gray-text"]}`}>
                        03 OCT 2022 (Sun)
                      </span>
                    </div>
                    <div>
                      <img src={ClockIcon} style={{ marginLeft: "2px" }} />
                      <span className={`ml-2 ${Styles["gray-text"]}`}>
                        8:00 AM - 12:00 PM
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <div>
                      <span className={`${Styles["gray-text"]}`}>
                        +20 Joined
                      </span>
                    </div>
                    <div>
                      <button className={Styles["event-details-btn"]}>
                        Show details
                      </button>
                      <button className={Styles["join-event-btn"]}>Join</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`col-sm-12 col-md-6 mt-4`}>
                <div className={`${Styles["event-item"]} p-3`}>
                  <div className={`d-flex`}>
                    <img src={UserImg} width="40px" />
                    <p className={`pt-2 ml-3`}>Ahmed Mohammed</p>
                  </div>
                  <div>
                    <p className={`pt-2 mb-0 ${Styles["gray-text"]}`}>
                      Running, Walking
                    </p>
                  </div>
                  <div className="d-flex">
                    <img src={WorldSmIcon} />
                    <span className={`ml-2 ${Styles["gray-text"]}`}>
                      Rehab 1
                    </span>
                  </div>
                  <div
                    className="d-flex justify-content-between"
                    style={{ width: "85%" }}
                  >
                    <div>
                      <img src={CalendarIcon} style={{ marginLeft: "2px" }} />
                      <span className={`ml-2 ${Styles["gray-text"]}`}>
                        03 OCT 2022 (Sun)
                      </span>
                    </div>
                    <div>
                      <img src={ClockIcon} style={{ marginLeft: "2px" }} />
                      <span className={`ml-2 ${Styles["gray-text"]}`}>
                        8:00 AM - 12:00 PM
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <div>
                      <span className={`${Styles["gray-text"]}`}>
                        +20 Joined
                      </span>
                    </div>
                    <div>
                      <button className={Styles["event-details-btn"]}>
                        Show details
                      </button>
                      <button className={Styles["join-event-btn"]}>Join</button>
                    </div>
                  </div>
                </div>
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

export default Events;
