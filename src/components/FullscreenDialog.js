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

export default function ScrollDialog({
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
                <p style={{ fontSize: "14px" }}>{gameInfo.released}</p>
              </div>
              <div className={classes.infoCard}>
                <Public />
                <span style={{ color: "#f2aa4c" }}>Metacritic</span>
                <p style={{ fontSize: "14px" }}>
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
                    "Not found"
                  )}
                </p>
              </div>
              <div className={classes.infoCard}>
                <Mood />
                <span style={{ color: "#f2aa4c" }}>Genres</span>
                <p style={{ fontSize: "14px" }}>
                  {genre[0] ? <span>{genre[0]}</span> : "Not found"}
                  <br />
                  {genre[1] && <span>{genre[1]}</span>}
                  <br />
                  {genre[2] && <span>{genre[2]}</span>}
                </p>
              </div>
              <div className={classes.infoCard}>
                <LocalGroceryStore />
                <span style={{ color: "#f2aa4c" }}>Stores</span>
                <div id="stores">
                  {/* {gameInfo.website && gameInfo.reddit_url ? (
                    <div>
                      <a
                        href={gameInfo.website}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "white" }}
                      >
                        Official Website
                      </a>
                      <br />
                      <a
                        href={gameInfo.reddit_url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "white" }}
                      >
                        Subreddit
                      </a>
                    </div>
                  ) : (
                    "Not found"
                  )} */}

                  {/* <div className="fir-row"> */}
                  {gameLinks.results.map(function (link) {
                    if (link.store_id === 1)
                      return (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          alt="Steam"
                        >
                          <svg
                            className="storesvg"
                            height="30"
                            width="30"
                            enable-background="new 0 0 512 512"
                            id="Layer_1"
                            version="1.1"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="256" cy="256" id="ellipse" r="256" />
                            <path
                              d="M360.5,154.5c-10-9.9-22-14.9-36.1-14.9c-14,0-26,5-35.9,15s-14.9,21.9-14.9,35.8  c0,14,5,26,14.9,35.9c9.9,9.9,21.9,14.9,35.9,14.9s26.1-5,36.1-14.9s15-21.9,15-35.9C375.5,176.4,370.5,164.5,360.5,154.5z   M391.4,123.8C372.9,105.3,350.5,96,324.1,96c-26,0-48.2,9.2-66.6,27.5S229.7,164,229.3,190l-59.2,84.7c-1.6-0.2-4-0.3-7.4-0.3  c-13.2,0-25.2,3.3-36,9.7L1,233.8c-0.6,7.3-1,14.7-1,22.2c0,24.5,3.4,48.1,9.8,70.6l84,33.6c3.5,16.1,11.7,29.5,24.6,40  s27.7,15.8,44.3,15.8c18.3,0,34.1-6.1,47.6-18.4s21.1-27.5,22.9-45.5l90.8-66.3c26.3,0,48.7-9.3,67.2-27.8s27.8-40.8,27.8-67  C419.1,164.7,409.9,142.3,391.4,123.8z M199.7,382.2c-10.2,10.1-22.5,15.1-36.8,15.1c-9.8,0-18.9-2.6-27.1-7.6  c-8.3-5.1-14.6-11.8-18.9-20.3c9.1,3.5,17.7,7,25.8,10.5c10.5,4.2,21,4.1,31.6-0.4c10.5-4.5,18-12.1,22.4-22.8  c4.2-10.5,4.1-21-0.4-31.6c-4.5-10.5-12.1-17.9-22.8-22.1l-21.6-8.7c3.9-0.9,7.5-1.3,11-1.3c14.4,0,26.7,5,36.8,15.1  c10.2,10.1,15.3,22.4,15.3,37S209.8,372.1,199.7,382.2z M369.1,235.9c-12.5,12.4-27.5,18.5-45,18.5s-32.5-6.2-44.9-18.5  s-18.6-27.3-18.6-44.9c0-17.5,6.2-32.5,18.6-45s27.3-18.7,44.9-18.7c17.7,0,32.8,6.2,45.1,18.5s18.5,27.4,18.5,45.1  C387.8,208.5,381.6,223.5,369.1,235.9z M324.4,139.7c-14,0-26,5-35.9,15s-14.9,21.9-14.9,35.8c0,14,5,26,14.9,35.9  s21.9,14.9,35.9,14.9s26.1-5,36.1-14.9s15-21.9,15-35.9s-5-26-15-35.9S338.4,139.7,324.4,139.7z M360.5,154.5  c-10-9.9-22-14.9-36.1-14.9c-14,0-26,5-35.9,15s-14.9,21.9-14.9,35.8c0,14,5,26,14.9,35.9c9.9,9.9,21.9,14.9,35.9,14.9  s26.1-5,36.1-14.9s15-21.9,15-35.9C375.5,176.4,370.5,164.5,360.5,154.5z"
                              fill="#FFFFFF"
                              id="logo"
                            />
                          </svg>
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
                          <svg
                            className="storesvg"
                            height="30"
                            width="30"
                            id="Layer_1"
                            version="1.1"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="256"
                              cy="256"
                              fill="#003087"
                              id="ellipse"
                              r="256"
                            />
                            <path
                              d="M287.9,184.8c0.9,4.3,0.6,8.7,0.6,13.1c0,24.1-0.1,48.2,0.1,72.4c7.3,3.4,15.1,6,23.2,5.9  c5.3,0.1,10.7-1.1,15.4-3.6c4.9-2.6,8.9-6.7,11.8-11.4c3.3-5.3,5.3-11.4,6.4-17.5c1.3-7.1,1.4-14.3,1.1-21.5  c-0.5-11-2.1-22.1-6.9-32.1c-2.6-5.5-6.2-10.6-10.6-14.9c-4-4.1-8.8-7.5-13.7-10.5c-11-6.5-23-10.9-35.2-14.7  c-7.7-2.5-15.5-4.8-23.3-7.1c-13.6-3.9-27.3-7.6-41.2-10.2c0,76.8,0,153.6,0,230.4c17.4,5.5,34.7,11,52.1,16.5  c0-64.6,0-129.1,0-193.7c0.1-3.7,0.7-7.6,3.1-10.5c1.4-1.8,3.9-2.8,6.1-2.4c2.3,0.5,4.5,1.4,6.2,2.9  C285.9,178.1,287.2,181.4,287.9,184.8z M151.8,321.3c17.9-6.4,35.8-12.8,53.7-19.2c0.2-1.2,0.1-2.4,0.1-3.6c0-8.9,0-17.8,0-26.7  c-22.7,8-45.3,16.1-67.9,24.1c-5.5,2-11.1,3.8-16.5,6.1c-6.3,2.6-12.5,5.6-18.1,9.5c-2.4,1.7-4.6,3.8-5.9,6.5  c-1.3,2.7-1.4,5.9-0.3,8.7c1.3,3.3,3.7,6,6.5,8.1c5,3.8,11,6.1,17,7.9c18.3,6,37.6,9,56.8,8.6c9.6-0.2,19.1-1.3,28.5-3  c0.1-1.5,0.1-3,0.1-4.5c0-7.5,0-15.1,0-22.6c-7.7,2.7-15.3,5.5-22.9,8.3c-2.9,1.1-5.9,2.1-9,2.7c-4.6,1-9.2,1.4-13.9,1.4  c-4.2-0.2-8.5-0.4-12.4-2c-1.4-0.6-2.9-1.4-3.6-2.9c-0.5-1.3,0.2-2.6,1.1-3.5C146.7,323.3,149.3,322.3,151.8,321.3z M410.9,304  c-4.5-4.1-10.2-6.6-15.9-8.6c-3.2-1-6.3-2.3-9.5-3.2c-16.2-5.1-33.3-7.2-50.3-7.3c-5.2,0.2-10.3,0.3-15.5,0.9  c-14.3,1.6-28.5,4.5-42.1,9.3c0,10.4,0,20.9,0,31.3c18.8-6.6,37.6-13.2,56.4-19.8c6.3-2.1,12.9-2.9,19.5-3c4.2,0.1,8.5,0.4,12.5,2  c1.4,0.6,2.9,1.4,3.5,2.9c0.6,1.7-0.6,3.2-1.8,4.2c-3,2.4-6.9,3.4-10.4,4.7c-26.4,9.4-52.8,18.8-79.2,28.2c-0.5,0.1-0.3,0.8-0.4,1.2  c0,9.7,0,19.4,0,29.2c34.7-12.5,69.4-24.9,104.1-37.4c5.7-2.1,11.5-3.9,16.9-6.7c5.1-2.6,10.2-5.5,14-9.8c2-2.3,3.4-5.3,3.3-8.4  C416,309.9,413.6,306.5,410.9,304z"
                              fill="#FFFFFF"
                              id="logo"
                            />
                          </svg>
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
                          <svg
                            className="storesvg"
                            width="30"
                            height="30"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M126.8 248.3c39.7-58.6 77.9-92.8 77.9-92.8s-42.1-48.9-92.8-67.4l-3.3-.8A224.13 224.13 0 0 0 77.2 391c0-4.4.6-70.3 49.6-142.7ZM480 256a223.71 223.71 0 0 0-76.6-168.7l-3.2.9c-50.7 18.5-92.9 67.4-92.9 67.4s38.2 34.2 77.9 92.8c49 72.4 49.6 138.3 49.5 142.7A222.8 222.8 0 0 0 480 256ZM201.2 80.9c29.3 13.1 54.6 34.6 54.6 34.6s25.5-21.4 54.8-34.6c36.8-16.5 64.9-11.3 72.3-9.5a224.06 224.06 0 0 0-253.8 0c7.2-1.8 35.2-7.1 72.1 9.5ZM358.7 292.9C312.4 236 255.8 199 255.8 199s-56.3 37-102.7 93.9c-39.8 48.9-54.6 84.8-62.6 107.8l-1.3 4.8a224 224 0 0 0 333.6 0l-1.4-4.8c-8-23-22.9-58.9-62.7-107.8Z"
                              fill="#107c10"
                              class="fill-000000"
                            ></path>
                          </svg>
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
                          <svg
                            className="storesvg"
                            height="30"
                            width="30"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path
                              d="M13.619 21c-.085 0-.141-.057-.127-.127V3.127c0-.056.042-.113.113-.113h2.785A4.61 4.61 0 0 1 21 7.624v8.766A4.61 4.61 0 0 1 16.39 21h-2.77zm3.422-9.926c-1.004 0-1.824.82-1.824 1.824s.82 1.824 1.824 1.824 1.824-.82 1.824-1.824-.82-1.824-1.824-1.824zM5.8 8.4a1.7 1.7 0 0 1 1.696-1.696A1.7 1.7 0 0 1 9.193 8.4c0 .934-.763 1.697-1.697 1.697A1.702 1.702 0 0 1 5.8 8.401zM11.54 3c.085 0 .142.057.128.127V20.86c0 .07-.057.127-.128.127H7.61A4.61 4.61 0 0 1 3 16.376V7.61A4.61 4.61 0 0 1 7.61 3h3.93zm-1.315 16.544V4.442H7.61c-.849 0-1.64.34-2.235.933a3.088 3.088 0 0 0-.933 2.235v8.766c0 .849.34 1.64.933 2.234a3.088 3.088 0 0 0 2.235.934h2.615z"
                              fill="#de0303"
                              class="fill-000000"
                            ></path>
                          </svg>
                        </a>
                      );
                    return null;
                  })}
                </div>

                {/* <div className="sec-row">

                    <svg
                      alt="subreddit"
                      className="storesvg"
                      height="30"
                      width="30"
                      viewBox="0 0 72 72"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <path
                          d="M36,72 L36,72 C55.882251,72 72,55.882251 72,36 L72,36 C72,16.117749 55.882251,-3.65231026e-15 36,0 L36,0 C16.117749,3.65231026e-15 -2.4348735e-15,16.117749 0,36 L0,36 C2.4348735e-15,55.882251 16.117749,72 36,72 Z"
                          fill="#FF5700"
                        />
                        <path
                          fill="#FFF"
                        />
                      </g>
                    </svg>

                    <Language className="storesvg" />
                  </div> */}
              </div>
            </div>
          </div>
          {/* </div> */}

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
        </DialogContent>
      </Dialog>
    </div>
  );
}
