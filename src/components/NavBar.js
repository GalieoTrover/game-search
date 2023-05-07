import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { SportsEsports } from "@material-ui/icons";

const NavBar = ({ classes }) => {
  return (
    <div>
      <Container
        style={{ display: "flex", justifyContent: "space-between" }}
        // className={classes.logoCont}
        className="logoCont"
      >
        <Link
          className={classes.titleMargin}
          to="/"
          style={{
            fontWeight: "bold",
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <SportsEsports style={{ marginRight: "3px" }} />
          GameSearch
        </Link>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link className={classes.linkButton} to="/about">
            About
          </Link>
          <a
            className={classes.linkButton}
            href="https://github.com/galieotrover/game-search"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
