import React, { useCallback, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CareerPrediction from "./components/career prediction/CareerPrediction";
import CareerPathway from "./components/career prediction/CareerPathway";
import Dashboard from "./components/layout/Dashboard";
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/user-slice";
import axios from "axios";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fetchUsersListHandler = useCallback(async () => {
    if (localStorage.getItem("token")) {
      dispatch(
        userActions.login({
          userAuthInfo: {
            token: localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
            name: localStorage.getItem("name"),
          },
        })
      );
      const expiryDate = localStorage.getItem("expiryDate");
      if (new Date(expiryDate) <= new Date()) {
        dispatch(userActions.logout());
        return;
      }
    }
    if (user.userAuthInfo.token && user.isLoggedIn) {
      //get request
      axios
        .get("https://sih-api.herokuapp.com/api/output", {
          headers: {
            Authorization:
              "Bearer " +
              (localStorage.getItem("token") || user.userAuthInfo.token),
          },
        })
        .then((response) => {
          const mlOutput = response.data.result;
          dispatch(
            userActions.addPathway({
              prediction: mlOutput.prediction,
              mean: mlOutput.mean,
              path: mlOutput.whole1[0].slice(1),
            })
          );
        })
        .catch((error) => {});
    }
  }, [dispatch, user.isLoggedIn, user.userAuthInfo.token]);

  useEffect(() => {
    fetchUsersListHandler();
  }, [fetchUsersListHandler]);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Dashboard
              smallText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
              header="Predict your career now!"
            />
          }
        />
        <Route path="/career-prediction" />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/predict-career" exact element={<CareerPrediction />} />
        <Route path="/predict-career/pathway" element={<CareerPathway />} />
      </Routes>
    </Router>
  );
};

export default App;
