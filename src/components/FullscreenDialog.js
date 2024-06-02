import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import {
  Code,
  CalendarToday,
  Mood,
  SupervisedUserCircle,
  Public,
  LocalGroceryStore,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import pink from "@material-ui/core/colors/pink";
import "../styles.css";
/* lightgallery imports */
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgFullscreen from "lightgallery/plugins/fullscreen";
/* icons */
import steamIcon from "../assets/images/steamIcon.svg";
import psIcon from "../assets/images/psIcon.svg";
import xboxIcon from "../assets/images/xboxIcon.svg";
import nintendoIcon from "../assets/images/nintendoIcon.svg";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontWeight: "bold",
  },
  dialogTitle: {
    fontFamily: "Roboto",
  },
  screenList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  metaLink: {
    color: pink[500],
    borderColor: pink[500],
    border: "1px solid ",
    padding: "1px",
    textDecoration: "none",
    fontWeight: "normal",
  },
  dialogLinks: {
    color: pink[500],
  },
  gameDetails: {
    display: "flex",
    flexFlow: "row wrap",
    gap: "5px",
    justifyContent: "center",
    marginTop: "20px",
  },
  infoCard: {
    background: "#234",
    color: "#fff",
    padding: "10px",
    borderRadius: "10px",
    width: "calc(82%/2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    fontFamily: "Roboto",
  },
  dialogHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "1.2rem !important",
  },
  related: {
    fontFamily: "Roboto",
    width: "90%",
    borderTop: "1px solid #787575",
    margin: "20px auto auto",
  },
  relatedHead: {
    margin: "10px 0px",
  },
  relatedGames: {
    display: "flex",
    gap: "10px",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  relatedGamesGame: {
    position: "relative",
    width: "calc(95%/2)",
  },
  relatedGamesImg: {
    width: "100%",
    height: "135px",
    borderRadius: "8px",
  },
  relatedGamesTitle: {
    position: "absolute",
    bottom: "-10px",
    zIndex: "1",
    left: "0px",
    width: "100%",
    background: "rgba(0,0,0,0.5)",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 0px",
    fontFamily: "Roboto",
    textAlign: "center",
    borderRadius: "8px",
  },
}));

export default function FullScreenDialog({
  gameName,
  gameInfo,
  genre,
  screen,
  open,
  handleClose,
  related,
  gameLinks,
}) {
  const [scroll, setScroll] = React.useState("paper");

  const classes = useStyles();

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="sm"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography variant="h6" className={classes.dialogHead}>
            {gameName}
            <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <div className="title-desc" style={{ textAlign: "center" }}>
            <img
              src={gameInfo.background_image}
              alt=""
              style={{ width: "87%", borderRadius: "8px" }}
            />

            <div className={classes.gameDetails}>
              <div className={classes.infoCard}>
                <Code />
                <span style={{ color: "#f2aa4c" }}>Developer</span>
                <p style={{ fontSize: "14px" }}>
                  {gameInfo.developers[0].name}
                </p>
              </div>
              <div className={classes.infoCard}>
                <SupervisedUserCircle />
                <span style={{ color: "#f2aa4c" }}>Publisher</span>
                <p style={{ fontSize: "14px" }}>
                  {gameInfo.publishers[0].name}
                </p>
              </div>
              <div className={classes.infoCard}>
                <CalendarToday />
                <span style={{ color: "#f2aa4c" }}>Release Date</span>
                {gameInfo.released ? (
                  <p style={{ fontSize: "14px" }}>
                    {gameInfo.released.split("-").reverse().join("/")}
                  </p>
                ) : (
                  <p>Not released yet</p>
                )}
              </div>
              <div className={classes.infoCard}>
                <Public />
                <span style={{ color: "#f2aa4c" }}>Metacritic</span>
                <div>
                  {gameInfo.metacritic && gameInfo.metacritic_url ? (
                    <a
                      href={gameInfo.metacritic_url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "white" }}
                      className="metacritic-url"
                    >
                      {gameInfo.metacritic}
                    </a>
                  ) : (
                    <p style={{ fontSize: "14px" }}>Not found</p>
                  )}
                </div>
              </div>
              <div className={classes.infoCard}>
                <Mood />
                <span style={{ color: "#f2aa4c" }}>Genres</span>
                <div className="game-genres" style={{ fontSize: "14px" }}>
                  {genre[0] ? (
                    <div className="game--genre">
                      <span>{genre[0]}</span>
                    </div>
                  ) : (
                    "Not found"
                  )}
                  {genre[1] && (
                    <div className="game--genre">
                      <span>{genre[1]}</span>
                    </div>
                  )}
                  {genre[2] && (
                    <div className="game--genre">
                      <span>{genre[2]}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className={classes.infoCard}>
                <LocalGroceryStore />
                <span style={{ color: "#f2aa4c" }}>Stores</span>
                <div id="stores">
                  {gameLinks.results &&
                    gameLinks.results.map(function (link) {
                      if (link.store_id === 1)
                        return (
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            alt="Steam"
                          >
                            <img
                              src={steamIcon}
                              alt="steamIcon"
                              className="storesvg"
                            />
                          </a>
                        );
                      if (link.store_id === 3)
                        return (
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            alt="Playstation"
                          >
                            <img
                              src={psIcon}
                              alt="psIcon"
                              className="storesvg"
                            />
                          </a>
                        );
                      if (link.store_id === 2)
                        return (
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            alt="Xbox"
                          >
                            <img
                              src={xboxIcon}
                              alt="xboxIcon"
                              className="storesvg"
                            />
                          </a>
                        );
                      if (link.store_id === 6)
                        return (
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            alt="Nintendo"
                          >
                            <img
                              src={nintendoIcon}
                              alt="nintendoIcon"
                              className="storesvg"
                            />
                          </a>
                        );
                      return null;
                    })}
                </div>
              </div>
            </div>
          </div>

          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {/* Description */}

            <Accordion
              style={{
                backgroundColor: "#2d2d2d",
                width: "90%",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.dialogTitle}>
                  Description
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <p>{gameInfo.description_raw}</p>
              </AccordionDetails>
            </Accordion>
          </DialogContentText>

          {/* Screenshots */}

          <Accordion
            style={{
              backgroundColor: "#2d2d2d",
              margin: "auto",
              marginTop: "20px",
              width: "90%",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.dialogTitle}>
                Screenshots
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <LightGallery speed={500} plugins={[lgThumbnail, lgFullscreen]}>
                {screen.map((item) => (
                  <a href={item.image}>
                    <img alt="" src={item.image} />
                  </a>
                ))}
              </LightGallery>
            </AccordionDetails>
          </Accordion>

          {/* Related games */}

          {related.length !== 0 && (
            <div className={classes.related}>
              <p className={classes.relatedHead}>Related games</p>
              <div className={classes.relatedGames}>
                {related.map((relGame) => (
                  <div className={classes.relatedGamesGame}>
                    <img
                      src={relGame.background_image}
                      className={classes.relatedGamesImg}
                      alt=""
                    />
                    <p className={classes.relatedGamesTitle}>{relGame.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
