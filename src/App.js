import React from "react";
import "@fontsource/roboto";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import { makeStyles } from "@material-ui/core";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/About";

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "Roboto",
  },
  titleMargin: {
    color: "#f2aa4c !important",
    textDecoration: "none",
    fontSize: "1.5em",
  },
  linkButton: {
    // marginRight: 10,
    fontSize: "1em",
    alignSelf: "center",
    textDecoration: "none",
    color: "#f2aa4c",
    "&:hover": {
      color: "white !important",
    },
  },
  searchMargin: {
    marginTop: 20,
    marginBottom: 40,
    width: "100%",
    alignSelf: "center",
  },
  buttonMargin: {
    marginTop: 20,
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <>
        <NavBar classes={classes} />

        <Switch>
          <Route exact path="/">
            <Search classes={classes} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
