import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./Footer";
import Navbar from "./Navbar";
import classes from "./Dashboard.module.css";
import { useLocation } from "react-router-dom";
import { useLayoutEffect, useState } from "react";

const mdTheme = createTheme();
let history = [];
export default function Dashboard(props) {
  const [animation, setAnimation] = useState("");
  const location = useLocation();

  useLayoutEffect(() => {
    history.push(location.pathname);

    if (location.pathname === "/predict-career") {
      if (history[history.length - 2]) {
        setAnimation(classes.predictCareer);
      } else {
        setAnimation(classes.predictCareerOpening);
      }
    } else if (
      location.pathname === "/" &&
      history[history.length - 2] === "/predict-career"
    ) {
      setAnimation(classes.predictCareer_rev);
    }
    if (window.innerWidth > 800) {
      if (
        location.pathname === "/login" &&
        history[history.length - 2] === "/predict-career"
      ) {
        setAnimation(classes.predictCareer_rev + " " + classes.signIn);
      } else if (
        history[history.length - 2] === "/login" &&
        location.pathname === "/sign-up"
      ) {
        setAnimation(classes.home);
      } else if (
        history[history.length - 2] === "/login" &&
        location.pathname === "/"
      ) {
        setAnimation(classes.home);
      } else if (location.pathname === "/login") {
        setAnimation(classes.signIn);
      }
    }
  }, [location.pathname]);

  const enterOutAnimation = () => {
    setAnimation(classes.homeAnimation);
  };
  return (
    <ThemeProvider theme={mdTheme}>
      <div className={classes.dashboardContainer + " " + animation}>
        <Navbar onEnterOut={enterOutAnimation} pathname={location.pathname} />

        <div className={classes.bottomContainer}>
          <h1>
            <div className={classes.inside}>{props.header}</div>
          </h1>
          <div className={classes.smallText}>
            <div className={classes.inside}>{props.smallText}</div>
          </div>
        </div>

        <div className={classes.bottomTriangle}></div>
      </div>
      {props.children}
      <Footer />
    </ThemeProvider>
  );
}
