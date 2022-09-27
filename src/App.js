import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Challenges from "./components/User/Challenges/Challenges";
import Tasks from "./components/User/Tasks/Tasks";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Auth formType="signup" />} />
          <Route exact path="/login" element={<Auth formType="login" />} />
          <Route exact path="/user" element={<Home />} />
          <Route exact path="/user/challenges" element={<Challenges />} />
          <Route exact path="/user/challenge/tasks" element={<Tasks />} />
        </Routes>
      </Router>
      <ToastContainer />
    </React.Fragment>
  );
};

export default App;
