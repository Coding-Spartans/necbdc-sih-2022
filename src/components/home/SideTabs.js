import { Button, Link, Stack, Typography } from "@mui/material";
import React from "react";
import BasicTabs from "../UI/BasicTabs";
import classes from "./SideTabs.module.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Tender = (props) => {
  const date = `${days[props.date.getDay()]}, ${
    months[props.date.getMonth()]
  } ${props.date.getDate()}, ${props.date.getFullYear()}`;
  return (
    <div>
      <Link sx={{ fontSize: 17 }} underline="hover">
        {props.children}
      </Link>
      <Typography color="text.secondary">Last Date: {date}</Typography>
    </div>
  );
};
const News = (props) => (
  <div>
    <Link sx={{ fontSize: 17 }} underline="hover">
      {props.children}
    </Link>
  </div>
);

const SideTabs = () => {
  const tabs = ["NECBDC News", "Tenders"];
  const tabsContent = [
    <Stack spacing={2}>
      <News>Jobs: Bamboo Assistant, DEO, Bamboo Expert</News>
      <News>Government launches 22 bamboo clusters in 9 States</News>
      <News>Bamboo sanitiser dispensers made in Arunachal Pradesh</News>
      <News>Bamboo shoot processing training unit launched</News>
      <Button className={classes.button}>View all articles</Button>
    </Stack>,
    <Stack spacing={2}>
      {/*date: year, month, day*/}
      <Tender date={new Date(2022, 2, 18)}>
        EoI: empanelment of local NGOs/ Organizations/Institutions/ Agencies
      </Tender>
      <Tender date={new Date(2002, 2, 18)}>EoI: Empanelment of experts</Tender>
      <Tender date={new Date(2002, 2, 18)}>
        Tender Notice - Bamboo Crushing Machines
      </Tender>
      <Button className={classes.button}>View more tenders</Button>
    </Stack>,
  ];
  return <BasicTabs {...{ tabs, tabsContent }} />;
};

export default SideTabs;
