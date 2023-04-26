// import React from 'react';
import * as React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@material-ui/core';
import { Code, CalendarToday, Link, Mood, SupervisedUserCircle, Public } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import pink from '@material-ui/core/colors/pink';
import "../styles.css";
/* lightgallery imports */
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgFullscreen from 'lightgallery/plugins/fullscreen'
// import LogoDevIcon from '@material-ui/core/Icon'
// import LogoDevIcon from '@mui/icons-material/LogoDev';
// import Dialog from '@material-ui/core/Dialog';
// import Container from '@material-ui/core/Container';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Slide from '@material-ui/core/Slide';
// import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
		fontWeight: 'bold',
	},
	dialogTitle: {
    fontFamily: 'Roboto'
	},
	screenList: {
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
	},
	metaLink: {
		color: pink[500],
		borderColor: pink[500],
		border: '1px solid ',
		padding: '1px',
		textDecoration: 'none',
		fontWeight: 'normal',
	},
	dialogLinks: {
		color: pink[500],
	},
  gameDetails: {
    display: 'flex',
    flexFlow: 'row wrap',
    gap: '5px',
    justifyContent: 'center',
    marginTop: '20px'
  },
  infoCard: {
    background: '#234',
    color: '#fff',
    padding: '10px',
    borderRadius: '10px',
    width: 'calc(100%/4)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'start',
    fontFamily: 'Roboto'
  },
  dialogHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  related: {
    fontFamily: 'Roboto',
    width: '90%',
    borderTop: '1px solid #787575',
    margin: '20px auto auto',
	},
  relatedHead: {
    margin: '10px 0px',
  },
  relatedGames: {
    display: 'flex',
    gap: '10px',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  relatedGamesGame: {
    position: 'relative',
  },
  relatedGamesImg: {
    width: '200px', 
    height: '150px',
    borderRadius: '8px'
  },
  relatedGamesTitle: {
    position: 'absolute',
    bottom: '-10px',
    zIndex: '1',
    left: '0px',
    width: '100%',
    background: 'rgba(0,0,0,0.5)',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0px',
    fontFamily: 'Roboto',
    textAlign: 'center',
    borderRadius: '8px'
  }
}));

export default function ScrollDialog({ gameName, gameInfo, genre, screen, open, handleClose, related}) {
  const [scroll, setScroll] = React.useState('paper');
  
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

    const onInit = () => {
        console.log('lightGallery has been initialized');
    };

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
        <DialogTitle id="scroll-dialog-title" >
          <Typography variant='h6' className={classes.dialogHead}>
            {gameName}
          <IconButton color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>

          </Typography>
          
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
			<div className='title-desc' style={{ textAlign: 'center' }}>
				<img src={gameInfo.background_image} style={{width: '87%', borderRadius: '8px'}}/>
        
        <div className={classes.gameDetails}>
          <div className={classes.infoCard}>
              <Code />
              <span style={{ color: '#f2aa4c' }}>Developer</span>
              <p style={{ fontSize: '14px' }}>{gameInfo.developers[0].name}</p>
          </div>
          <div className={classes.infoCard}>
            <SupervisedUserCircle />
            <span style={{ color: '#f2aa4c' }}>Publisher</span>
            <p style={{ fontSize: '14px' }}>{gameInfo.publishers[0].name}</p>
          </div>
          <div className={classes.infoCard}>
            <CalendarToday />
            <span style={{ color: '#f2aa4c'}}>Release Date</span>
            <p style={{ fontSize: '14px' }}>{gameInfo.released}</p>
          </div>
          <div className={classes.infoCard}>
            <Public />
              <span style={{ color: '#f2aa4c'}}>Metacritic</span>
              <p style={{ fontSize: '14px' }}>
                {gameInfo.metacritic && gameInfo.metacritic_url ? (	
                <a href={gameInfo.metacritic_url} target="_blank" rel="noreferrer" style={{ color: 'white'}}>{gameInfo.metacritic}</a>
                ) : ('Not found')}
              </p>
          </div>
          <div className={classes.infoCard}>
            <Mood />
            <span style={{ color: '#f2aa4c'}}>Genres</span>
            <p style={{ fontSize: '14px' }}>
              {genre[0] ? <span>{genre[0]}</span> : 'Not found'}<br />
              {genre[1] && <span>{genre[1]}</span>}<br />
              {genre[2] && <span>{genre[2]}</span>}
            </p>
          </div>
          <div className={classes.infoCard}>
              <Link />
              <span style={{ color: '#f2aa4c'}}>Links</span>
                <p style={{ fontSize: '14px' }}>
                  {gameInfo.website && gameInfo.reddit_url ? (
                  <div>
                      <a href={gameInfo.website} target="_blank" rel="noreferrer" style={{color: 'white'}}>Official Website</a>
                    <br/>
                      <a href={gameInfo.reddit_url} target="_blank" rel="noreferrer" style={{color: 'white'}}>Subreddit</a>
                    </div>
                ) : ('Not found')}
            </p>
          </div>

        </div>
      
			</div>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >

          { /* Description */ }
          
            <Accordion style={{ backgroundColor: '#2d2d2d', margin: 'auto', marginTop: '20px', width: '90%' }}>
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

          { /* Screenshots */}

          <Accordion style={{ backgroundColor: '#2d2d2d', margin: 'auto', marginTop: '20px', width: '90%' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.dialogTitle}>
                  Screenshots
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgFullscreen]}>
                  {screen.map((item) => (
                    <a href={item.image}>
                    <img alt="" src={item.image} />
                  </a>
                  ))}
                </LightGallery>
              </AccordionDetails>
            </Accordion>

            { /* Related games */ }
            
            <div className={classes.related}>
              <p className={classes.relatedHead}>Related games</p>
              <div className={classes.relatedGames}>
                  {related.map((relGame) => 
                  (<div className={classes.relatedGamesGame}>
                    <img src={relGame.background_image} className={classes.relatedGamesImg} alt=""/>
                    <p className={classes.relatedGamesTitle}>{relGame.name}
                </p>
                  </div>)
                )}
              </div>
            </div>

        </DialogContent>
      </Dialog>
    </div>
  );
}