import React, { useState } from "react";
import { Button } from "@mui/material";
import classes from "./UserDetailsForm.module.css";
import RadioButton from "../UI/RadioButton";
import AutoCompleteField from "./AutoCompleteField";

const radioQuestions = [
  {
    headerLabel: "Your 12th CGPA",
    options: [
      { label: "100 - 80", value: 2 },
      { label: "79 - 50", value: 1 },
      { label: "Below 50", value: 0 },
    ],
  },
  {
    headerLabel: "Economic Stability",
    options: [
      { label: "Chronic poor (Poor)", value: 0 },
      {
        label: "Transient poor (Hard situations might make them poor)",
        value: 1,
      },
      { label: "Non poor (Rich)", value: 2 },
    ],
  },
  {
    headerLabel: "Personality Extraversion",
    options: [
      { label: "Extrovert", value: 0 },
      {
        label: "Ambivert",
        value: 1,
      },
      { label: "Introvert", value: 2 },
    ],
  },
  {
    headerLabel: "Agreeableness",
    options: [
      { label: "Agreeable", value: 0 },
      {
        label: "Slightly agreeable",
        value: 1,
      },
      { label: "Disagree mostly", value: 2 },
    ],
  },
  {
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
];

const UserDetailsForm = () => {
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(false);
  const answerSelectHandler = (question, answer) => {
    setAnswers((prevState) => {
      return { ...prevState, [`${question}`]: answer };
    });
  };
  const submitHandler = (event) => {
    setError(false);
    const questions = [];
    radioQuestions.forEach((question) => {
      questions.push(question.headerLabel);
    });
    questions.push("Area of interest");
    const questionsAnswered = Object.keys(answers);

    if (
      questions.length !== questionsAnswered.length ||
      !answers["Area of interest"]
    ) {
      setError(true);
      return;
    }
  };
  return (
    <div className={classes.formContainer}>
      <div className={classes.form}>
        <h5>Fill the details</h5>
        <div className={classes.radioQuestions}>
          {radioQuestions.map((radioQuestion, index) => (
            <RadioButton
              key={index}
              {...{
                ...radioQuestion,
                index,
                onSelectAnswer: answerSelectHandler,
                error,
                selectedAnswer: answers[radioQuestion.headerLabel],
              }}
            />
          ))}
        </div>

        <AutoCompleteField
          onEnterInterest={answerSelectHandler}
          error={error}
          chosenInterest={answers["Area of interest"]}
        />
        <div className={classes.userDetailsForm_actions}>
          <Button
            className={classes.formButton + " " + classes.signIn}
            variant="contained"
            onClick={submitHandler}
          >
            predict
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsForm;
