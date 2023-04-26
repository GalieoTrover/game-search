import { useState, useEffect } from 'react';
import { TextField, Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchResults from './SearchResults';
import { createTheme, ThemeProvider } from '@material-ui/core';

const Search = ({ classes }) => {
	const [gameData, setGameData] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	// const [randomGame, setRandomGame] = useState([]);

	useEffect(() => {
		fetch(
			`https://api.rawg.io/api/games?key=208b3bfe90d940ba9127c24125bae44b&search_exact=true&search=${searchTerm}&page_size=30&exclude_additions=true`
		)
			.then((res) => {
				if (!res.ok) {
					throw Error(`${res.status}: Could not fetch the data`);
				}
				return res.json();
			})
			.then((data) => {
				if (
					data.results.length === 0 ||
					(!data.results.metacritic && data.results.ratings_count === 0)
				) {
					throw Error('Game not found');
				} else {
					const filtered = data.results.filter(
						(res) => res.metacritic || res.ratings_count
					);

					setGameData(filtered);
					setIsLoading(false);
				}
				setError(null);
			})
			.catch((error) => setError(error.message), setIsLoading(false));
	}, [searchTerm]);

	// const randomId = Math.floor(Math.random() * 100);

	const darkTheme = createTheme({
		palette: {
			type: 'dark',
		},
	});

	return (
		<div className={classes.root}>
			<ThemeProvider theme={darkTheme}>
				<Container>
					<TextField
						label="Search for a game title"
						placeholder="eg: Call of duty, Fifa, Far cry"
						// color="secondary"
						className={classes.searchMargin}
						onChange={(e) => setSearchTerm(e.target.value)}
					></TextField>
					{error && (
						<p style={{ textAlign: 'center', fontSize: 30, color: 'white' }}>
							{error}
						</p>
					)}
					{isLoading && (
						<div style={{ textAlign: 'center', fontSize: 30, color: 'white' }}>
							Loading...
							<br />
							<CircularProgress color="secondary" />
						</div>
					)}
				</Container>
				{gameData && <SearchResults gameData={gameData} term={searchTerm}/>}
			</ThemeProvider>
		</div>
	);
};

export default Search;
