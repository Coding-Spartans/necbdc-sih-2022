import { FormLabel, TextField } from "@mui/material";
import { useState } from "react";
import classes from "./UserDetailsForm.module.css";

const NumberQuestion = (props) => {
  const [focus, setFocus] = useState(false);
  return (
    <div
      className={classes.question}
      onFocus={() => {
        setFocus(true);
      }}
      onBlur={() => {
        setFocus(false);
      }}
    >
      <FormLabel
        sx={{ color: focus ? "#1976d2" : "", transition: "color 0.2s ease" }}
        id={props.headerLabel}
      >
        {props.headerLabel}*
      </FormLabel>
      <TextField
        variant="standard"
        // label={props.headerLabel}
        type={props.type}
        size="small"
        onChange={(event) => {
          if (+event.target.value)
            props.onSelectAnswer(props.headerLabel, +event.target.value);
        }}
        error={props.error && !props.selectedAnswer}
        fullWidth
        helperText={
          props.error && !props.selectedAnswer ? "Enter a valid answer" : ""
        }
        placeholder={
          "Enter " +
          (props.headerLabel.toLowerCase().includes("percentage")
            ? "percentage"
            : "answer")
        }
      />
    </div>
  );
};

export default NumberQuestion;
