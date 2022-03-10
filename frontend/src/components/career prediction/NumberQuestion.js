import { TextField } from "@mui/material";
import classes from "./UserDetailsForm.module.css";

const NumberQuestion = (props) => {
  return (
    <TextField
      variant="standard"
      label={props.headerLabel}
      type={props.type}
      size="small"
      onChange={(event) => {
        props.onSelectAnswer(props.headerLabel, event.target.value);
      }}
      error={props.error && !props.selectedAnswer}
      // fullWidth
      className={classes.question}
      helperText={
        props.error && !props.selectedAnswer ? "Enter a valid answer" : ""
      }
    />
  );
};

export default NumberQuestion;
