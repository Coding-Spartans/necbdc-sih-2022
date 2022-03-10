import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import classes from "./UserDetailsForm.module.css";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
  },
});
export default function AutocompleteField(props) {
  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        id="Area of interest"
        options={props.options}
        getOptionLabel={(option) => option.option}
        className={classes.question}
        onChange={(event, newValue) => {
          props.onEnterAnswer(props.headerLabel, newValue && newValue.value);
        }}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            
            error={
              props.error &&
              (props.chosenOption === undefined || props.chosenOption === null)
            }
            helperText={
              props.error &&
              (props.chosenOption === undefined || props.chosenOption === null)
                ? "Enter a valid option"
                : ""
            }
            variant="standard"
            label={props.headerLabel}
            placeholder={""}
          />
        )}
      />
    </ThemeProvider>
  );
}
