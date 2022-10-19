import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

import {
  registerUserAsync,
  loginUserAsync,
  selectUser,
  selectUserLoading,
  selectUserError,
  selectUserIsLoggedIn,
} from "../../store/reducers/user";
import Styles from "./Auth.module.css";
import NavBar from "../Navbar/Navbar";

const Auth = ({ formType }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [authState, setAuthState] = useState({ email: "", password: "" });

  const selectUserSelector = useSelector(selectUser);
  const selectUserLoadingSelector = useSelector(selectUserLoading);
  const selectUserErrorSelector = useSelector(selectUserError);
  const selectUserIsLoggedInSelector = useSelector(selectUserIsLoggedIn);

  const authClickHandler = async () => {
    if (formType === "signup") {
      const registerPromise = dispatch(registerUserAsync(authState));
      registerPromise
        .then(unwrapResult)
        .then((promiseResponse) => {
          toast("Registered successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/login");
        })
        .catch((promiseError) =>
          toast("Registered Failed!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
    } else {
      const loginPromise = dispatch(loginUserAsync(authState));
      // loginPromise.then((res) => console.log(res));
      loginPromise
        .then(unwrapResult)
        .then((promiseResponse) => {
          toast("Login successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/user");
        })
        .catch((promiseError) =>
          toast("Login Failed!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
    }
  };

  useEffect(() => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");
  }, []);

  return (
    <React.Fragment>
      <NavBar />

      <div className={`container mt-5`}>
        <div className={`row mt-5`}>
          <div
            className={`col-sm-12 col-md-7 py-5 px-4 ${Styles["auth-container"]}`}
          >
            <h4 className={`${Styles["auth-header"]}`}>
              {formType === "signup" ? "Sign Up" : "Sign In"}
            </h4>
            <p className={`${Styles["auth-p"]}`}>
              {formType === "signup"
                ? "It's not long before you embark on this journey!"
                : "Hello again, You’ave been missed!"}
            </p>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">E-mail</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="exampleInputEmail1"
                  placeholder="name@email.com"
                  value={authState.email}
                  onChange={(e) =>
                    setAuthState({ ...authState, email: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="exampleInputPassword1"
                  placeholder="8+ Characters, 1 Capital letter"
                  value={authState.password}
                  onChange={(e) =>
                    setAuthState({ ...authState, password: e.target.value })
                  }
                />
              </div>
              <div className="form-check d-flex">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label
                  className={`form-check-label ${Styles["check-box-label"]}`}
                  htmlFor="exampleCheck1"
                >
                  I've read and agree with Terms of Service and our Privacy
                  Police
                </label>
              </div>
              <button
                type="button"
                className={`mt-4 ${Styles["auth-btn"]}`}
                onClick={authClickHandler}
              >
                {formType === "signup" ? "Create an account" : "Login"}
              </button>
            </form>
          </div>
          <div
            className={`d-sm-none d-md-flex justify-content-center col-md-5 ${
              formType === "signup"
                ? Styles["signup-side-img"]
                : Styles["login-side-img"]
            }`}
          ></div>
          {/* <div className={`d-sm-none d-md-block col-md-6`}>
          <h4 className={`${Styles["auth-header"]}`}>{formType === "signup" ? "Sign Up" : "Login"}</h4>
          <p className={`${Styles["auth-p"]}`}>
            It's not long before you embark on this journey!
          </p>
        </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auth;
