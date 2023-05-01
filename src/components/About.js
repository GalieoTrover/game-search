import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  align: {
    display: "flex",
    justifyContent: "center",
    color: "white",
    marginTop: 50,
  },
  links: {
    color: "#f2aa4c",
  },
});

const About = () => {
  const classes = useStyles();

  return (
    <div>
      <Container style={{ color: "white", marginTop: 40 }}>
        <h4>Q. What is this website about?</h4>
        <p>
          A. This is one of my side projects mainly to learn front-end web
          development. The app shows data about the searched game title. Source
          code is available at the Github link.
        </p>
        <h4>Q. What technologies are being used?</h4>
        <p>
          A. This is React based web application styled using{" "}
          <a
            className={classes.links}
            href="https://material-ui.com"
            target="_blank"
            rel="noreferrer"
          >
            Material-UI
          </a>
          . The data is sourced from{" "}
          <a
            className={classes.links}
            href="https://rawg.io"
            target="_blank"
            rel="noreferrer"
          >
            RAWG's
          </a>{" "}
          API.
        </p>
        <h4>Q. Who made this?</h4>
        <p>
          A.{" "}
          <a
            className={classes.links}
            href="https://github.com/galieotrover"
            target="_blank"
            rel="noreferrer"
          >
            Valay Maskey
          </a>{" "}
        </p>
        <Link className={classes.align} to="/">
          Go back
        </Link>
      </Container>
    </div>
  );
};

export default About;
