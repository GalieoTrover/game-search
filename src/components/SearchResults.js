import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import FullScreenDialog from './FullscreenDialog';

const useStyles = makeStyles((theme) => ({
	card: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		// backgroundColor: '#291755',
	},
	dialog: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		color: '#f2aa4c',
		fontWeight: 'bold',
	},
	image: {
		cursor: 'pointer',
		'&:hover': {
			borderColor: '#f2aa4c',
			border: '5px solid',
			padding: 5,
		},
	},
	gameList: {
		justifyContent: 'center',
		// backgroundColor: '#291755',
		width: '100%',
		overflow: 'hidden',
	},
	screenList: {
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
	},
	title: {
		color: 'white',
	},
	subheader: {
		marginBottom: 20,
		fontSize: 25,
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
}));

const Item = ({ gameData, term, random }) => {
	const classes = useStyles();

	const name = gameData.map((item) => item.name);

	const [related, setRelated] = useState([]);
	const [gameName, setGameName] = useState(name);
	const [gameInfo, setGameInfo] = useState(null);
	const [genre, setGenre] = useState([]);
	const [screen, setScreen] = useState(null);
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickOpen = (e) => {
		setOpen(true);

		// getting game title in dialog
		for (let i = 0; i < name.length; i++) {
			if (e.target.alt === name[i]) {
				setGameName(e.target.alt);
			}
		}

		// getting release date in dialog
		let value = e.target.alt;
		const index = gameData.findIndex((item) => item.name === value);

		// getting screenshots in dialog
		const images = gameData[index].short_screenshots.slice(1, 7);
		setScreen(images);

		// getting genres in dialog
		const eachGenres = [];

		for (let i = 0; i < gameData[index].genres.length; i++) {
			eachGenres.push(gameData[index].genres[i].name);
		}

		let gameSlug = gameData[index].slug;

		fetch(`https://api.rawg.io/api/games/${gameSlug}/game-series?key=208b3bfe90d940ba9127c24125bae44b`)
		.then((res)=>res.json())
		.then(function(data) {
			let relGames = data.results.slice(0,4);

			setRelated(relGames);
		})

		setGenre(eachGenres);

		fetch(
			`https://api.rawg.io/api/games/${gameData[index].id}?key=208b3bfe90d940ba9127c24125bae44b`
		)
			.then((res) => res.json())
			.then((data) => setGameInfo(data));
	};

	return (
		<div className={classes.card}>
			{term ? null : (
				<h2 style={{ color: 'white', marginTop: 5 }}>Popular Games</h2>
			)}
			<ImageList className={classes.gameList} cols={3.2}>
				{gameData.map((item) => (
					<ImageListItem key={item.slug} className={classes.image}>
						<img
							src={item.background_image}
							alt={item.name}
							onClick={handleClickOpen}
						/>
						<ImageListItemBar
							title={
								<span style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
									{item.name}
								</span>
							}
							subtitle={
								<div>
									<span style={{ marginRight: '2em' }}>
										Metacritic: <span>{item.metacritic}</span>
									</span>
								</div>
							}
							classes={{
								root: classes.titleBar,
								title: classes.title,
							}}
						/>
					</ImageListItem>
				))}
			</ImageList>
			
			{gameInfo && (
				<FullScreenDialog
					gameData={gameData}
					gameName={gameName}
					gameInfo={gameInfo}
					screen={screen}
					genre={genre}
					handleClick={handleClickOpen}
					handleClose={handleClose}
					open={open}
					related={related}
				/>
			)}
		</div>
	);
};

export default Item;