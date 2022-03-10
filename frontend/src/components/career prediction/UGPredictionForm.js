import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import classes from "./UserDetailsForm.module.css";
import RadioButton from "../UI/RadioButton";
import AutoCompleteFieldUG from "./AutoCompleteFieldUG";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import { useNavigate } from "react-router-dom";
import NumberQuestion from "./NumberQuestion";
import AutocompleteField from "./AutoCompleteField";

const predictionQuestions = [
  {
    type: "radio",
    headerLabel: "Openness",
    options: [
      { label: "Open in nature", value: 0 },
      {
        label: "Opens for need",
        value: 1,
      },
      { label: "Closed nature", value: 2 },
    ],
  },
  {
    type: "number",
    headerLabel: "Number Field",
  },
  {
    type: "auto-complete",
    headerLabel: "Auto Complete",
    options: [
      { option: "Field1", value: 0 },
      { option: "Field2", value: 1 },
      { option: "Field3", value: 2 },
    ],
  },
];

const UGPredictionForm = () => {
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(false);
  const [responseError, setResponseError] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate("/login");
    }
  }, [
    navigate,
    user.isLoggedIn,
    user.userPath.path.length,
    user.userPath.prediction.length,
  ]);
  const answerSelectHandler = (question, answer) => {
    setAnswers((prevState) => {
      return { ...prevState, [`${question}`]: answer };
    });
  };
  const submitHandler = (event) => {
    setError(false);
    setResponseError(false);
    setLoading(true);
    const questions = [];
    predictionQuestions.forEach((question) => {
      questions.push(question.headerLabel);
    });
    const questionsAnswered = Object.keys(answers);

    if (questions.length !== questionsAnswered.length) {
      setError(true);
      setLoading(false);
      setResponseError(false);
      return;
    }
    const answersArray = questions.map((question) => +answers[question]);
    if (null in answers) {
      setError(true);
      setLoading(false);
      setResponseError(false);
      return;
    }
    console.log(answersArray);
    // axios
    //   .post("https://forestclassifier-api.herokuapp.com/post", {
    //     input: [...answersArray],
    //   })
    //   .then((response) => {
    //     const mlOutput = response.data;
    //     dispatch(
    //       userActions.addPathway({
    //         prediction: mlOutput.prediction,
    //         mean: mlOutput.mean,
    //         path: mlOutput.whole1[0].slice(1),
    //       })
    //     );
    //     axios
    //       .post(
    //         "https://sih-api.herokuapp.com/api/output",
    //         { ...mlOutput },
    //         {
    //           headers: {
    //             Authorization: "Bearer " + user.userAuthInfo.token,
    //           },
    //         }
    //       )
    //       .then((response) => {
    //         navigate("/predict-career/pathway");
    //       });
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     console.log(error);
    //     setResponseError("Something went wrong :(");
    //   });
    // https://forestclassifier-api.herokuapp.com/post
  };
  return (
    <div className={classes.formContainer}>
      <div className={classes.form}>
        <h5>Fill the details</h5>
        <div className={classes.radioQuestions}>
          {predictionQuestions.map((question, index) => {
            switch (question.type) {
              case "radio":
                return (
                  <RadioButton
                    key={index}
                    {...{
                      ...question,
                      index,
                      onSelectAnswer: answerSelectHandler,
                      error,
                      selectedAnswer: answers[question.headerLabel],
                    }}
                  />
                );
              case "number":
                return (
                  <NumberQuestion
                    key={index}
                    {...{
                      ...question,
                      index,
                      onSelectAnswer: answerSelectHandler,
                      error,
                      selectedAnswer: answers[question.headerLabel],
                    }}
                  />
                );
              case "auto-complete":
                return (
                  <AutoCompleteFieldUG
                    key={index}
                    {...{ ...question, error }}
                    onEnterAnswer={answerSelectHandler}
                    error={error}
                    chosenOption={answers[question.headerLabel]}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
        {/* <AutocompleteField
          onEnterInterest={answerSelectHandler}
          error={error}
          chosenInterest={answers["Area of interest"]}
        /> */}
        {responseError ? (
          <div className={classes.responseError}>{responseError}</div>
        ) : null}
        <div className={classes.userDetailsForm_actions}>
          <Button
            className={classes.formButton + " " + classes.signIn}
            variant="contained"
            onClick={submitHandler}
          >
            {loading ? (
              <CircularProgress
                sx={{ width: "25px!important", height: "25px!important" }}
                color="inherit"
              />
            ) : (
              "predict"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UGPredictionForm;
