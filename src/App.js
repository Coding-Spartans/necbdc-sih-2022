import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CareerPrediction from "./components/career prediction/CareerPrediction";
import Dashboard from "./components/layout/Dashboard";
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";

const App = () => {
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchUsersListHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // const response = await fetch("https://sih-api.herokuapp.com/api/data", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     marks: "0",
      //     status: "0",
      //     personality: "0",
      //     agree: "0",
      //     aoi: "0",
      //     opens: "0",
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // if (response.status !== 200 || response.status !== 201) {
      //   throw new Error("Something went wrong!");
      // }

      // const loadedUsersList = response;
      // console.log(response);
      // setUsersList(loadedUsersList);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

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
        <Route path="/predict-career" element={<CareerPrediction />} />
      </Routes>
    </Router>
  );
};

export default App;
