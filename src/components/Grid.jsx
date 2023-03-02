// Importing necessary libraries and components
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

// Defining CSS styles using Material UI's makeStyles function
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    borderRadius: "16px",
    cursor: "pointer",
  },
  info: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "24px",
    zIndex: 2,
    transition: "all 0.2s ease-in-out",
    display: "none",
  },
  date: {
    position: "absolute",
    top: "70%",
    left: "50%",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "black",
    padding: "5px",
    borderRadius: "10px",
    transform: "translate(-50%, -50%)",
    fontSize: "16px",
    zIndex: 2,
  },
  imageContainer: {
    position: "relative",
    [theme.breakpoints.up("md")]: {
      width: "33.33%",
      margin: "2px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "16.67%",
      margin: "2px",
    },
    "&:hover $info": {
      display: "inline",
      opacity: 1,
      cursor: "pointer",
    },
    "&:hover $image": {
      transition: "all 0.2s ease-in-out",
      filter: "brightness(25%)",
    },
  },
}));

// Defining a functional component named Grids
export const Grids = () => {
  // Using useState hook to define state variable
  const [data, setData] = useState([]);

  // Fetches data from API and sets it to the state
  const getApi = async () => {
    const res = await axios.get(
      "https://raw.githubusercontent.com/obvious/take-home-exercise-data/trunk/nasa-pictures.json"
    );
    setData(res.data);
  };

  // Using useEffect hook to execute getApi function only once when component mounts
  useEffect(() => {
    getApi();
  }, []);

  // Sorting the data in descending order of creation date
  let sortedData = data.sort(
    (a, b) =>
      new Date(...b.date.split("/").reverse()) -
      new Date(...a.date.split("/").reverse())
  );

  // Using makeStyles function to create an instance of the defined styles
  const classes = useStyles();

  // Using useNavigate hook to define a navigation function
  const navigate = useNavigate();

  // Handles click event on an image and navigates to the detail page
  const handleClick = (image) => {
    navigate("/detail", { state: { image, data: sortedData } });
  };

  // Renders the grid of images
  return (
    <>
      <Grid container className={classes.container}>
        {sortedData.map((image, index) => (
          <Grid
            item
            xs={12}
            md={4}
            lg={2}
            key={index}
            className={classes.imageContainer}
            onClick={() => handleClick(image)}
          >
            <h4 className={classes.info}>Open</h4>
            <h4 className={classes.date}>
              Created At: <br /> {image.date}
            </h4>
            <img src={image.url} alt="url" className={classes.image} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Grids;
