// Importing necessary libraries and components
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Grid,
  Typography,
  CardMedia,
  Paper,
  Box,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Defining CSS styles using Material UI's makeStyles function
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#CAB9B9",
  },
  container: {
    [theme.breakpoints.up("lg")]: {
      display: "flex",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  title: {
    textDecorationLine: "underline",
  },
  detail: {
    textAlign: "justify",
    padding: "20px",
  },
  about: {
    textDecorationLine: "underline",
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
  },
  media: {
    paddingTop: "56.25%",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "100%",
    },
  },
  button: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: "10px",
    margin: "20px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

export const Details = () => {
  // state to store images data
  const [images, setImages] = useState([]);
  // state to store the current image object
  const [currImage, setCurrImage] = useState([]);
  // state to store the current image index
  const [index, setIndex] = useState([]);
  // hook to get the current location object
  const location = useLocation();
  // get the classes from the styles hook
  const classes = useStyles();

  useEffect(() => {
    // set the images state from the location data
    setImages(location.state.data);
    // set the current image state from the location image
    setCurrImage(location.state.image);
    // find the index of the current image
    const res = images.findIndex((x) => x.copyright === currImage.copyright);
    // set the index of the current image
    setIndex(res);
  }, []);

  // function to handle previous button click
  const prevHandle = (curr) => {
    const res = images.findIndex((x) => x.copyright === curr);
    // if current index is not zero
    if (res !== 0) {
      // set the current image to the previous image
      setCurrImage(images[res - 1]);
      setIndex(res - 1);
    }
  };

  // useEffect to handle changes in the current image
  useEffect(() => {
    const res = images.findIndex((x) => x.copyright === currImage.copyright);
    setIndex(res);
  }, [currImage]);

  // function to handle next button click
  const nextHandle = (cur) => {
    // Find the index of the current image and increment it to go to the next image
    const res = images.findIndex((x) => x.copyright === cur);
    if (res < images.length - 1) {
      setCurrImage(images[res + 1]);
      setIndex(res + 1);
    }
  };

  return (
    <>
      <Grid container className={classes.root}>
        <Paper>
          <Box className={classes.container}>
            <Grid item xs={12} md={6}>
              <Typography className={classes.title} variant="h4">
                <b>Title:</b> {currImage.title}
              </Typography>
              <Typography className={classes.detail} variant="body1">
                {currImage.explanation}
              </Typography>
              <Box className={classes.about}>
                <Typography variant="h6">
                  <b>Copyright:</b> {currImage.copyright}
                </Typography>
                <Typography variant="h6">
                  <b>Service_Version:</b> {currImage.service_version}
                </Typography>
                <Typography variant="h6">
                  <b>Date:</b> {currImage.date}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardMedia
                className={classes.media}
                image={currImage.hdurl}
                title={currImage.title}
              />
            </Grid>
          </Box>
        </Paper>
        <Paper className={classes.button}>
          <Grid className={classes.buttons} item xs={12} md={6}>
            <Button
              variant="contained"
              color="primary"
              disabled={index == 0 ? true : false}
              onClick={() => prevHandle(currImage.copyright)}
            >
              prev
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={index == images.length - 1 ? true : false}
              onClick={() => nextHandle(currImage.copyright)}
            >
              next
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default Details;
