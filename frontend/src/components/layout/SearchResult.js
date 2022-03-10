import Dashboard from "../layout/Dashboard";
import CareerCard from "../Career library/CareerCard";
import { Grid, Button } from "@mui/material";

const cardColor = {
  Engineering: "orange",
  "Computer Science & It": "blue",
  Business: "blue",
  "Medical Science": "blue",
  Others: "blue",
};

const SearchResults = (props) => {
  return (
    <Dashboard>
      <Grid
        container
        justifyContent="center"
        spacing={{ md: 1, xs: 0 }}
        sx={{ marginTop: "-1.5rem !important", marginBottom: "8rem" }}
      >
        {props.careerData?.map((career, index) => (
          <CareerCard
            color={cardColor[career?.domainName]}
            key={index}
            transitionDelay={0}
            to={`/career-library/${career?.domainName}/${career?.name}`}
            header={career?.name}
            details={
              career?.description.length > 175
                ? career?.description.substring(
                    0,
                    window.innerWidth > 600 ? 175 : 140
                  ) + "..."
                : career?.description
            }
            imageSrc={career?.imageUrl}
          />
        ))}
      </Grid>
    </Dashboard>
  );
};

export default SearchResults;
