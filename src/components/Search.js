import { useState, useEffect } from "react";
import Carousel from "./Carousel";
import SearchResults from "./SearchResults";
/* Material-UI imports */
import { TextField, Container, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createTheme, ThemeProvider } from "@material-ui/core";

const Search = ({ classes }) => {
  const [gameData, setGameData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latest, setLatest] = useState(null);
  const [appState, setAppState] = useState("gameData");

  let currentYear = new Date().getFullYear();

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=208b3bfe90d940ba9127c24125bae44b&dates=${currentYear}-01-01,${currentYear}-12-31&page_size=30`
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
          throw Error("Game not found");
        } else {
          const filtered = data.results.filter(
            (res) => res.metacritic || res.ratings_count
          );

          setGameData(filtered);
          setIsLoading(false);
        }
        setError(null);
      })
      .catch((error) => setError(error.message));
  }, []);

  const getSearchResults = async () => {
    const fetchSearchResults = await fetch(
      `https://api.rawg.io/api/games?key=208b3bfe90d940ba9127c24125bae44b&search_exact=true&search=${searchTerm}&page_size=15&exclude_additions=true`
    );
    const jsonSearchResults = await fetchSearchResults.json();
    const dataSearchResults = await jsonSearchResults;

    setSearchResults(dataSearchResults.results);
    setAppState("searchResults");
  };

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=208b3bfe90d940ba9127c24125bae44b&dates=${currentYear}-01-01,${currentYear}-12-31&page_size=30`
    )
      .then((res) => res.json())
      .then((data) => setLatest(data));
  }, []);

  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });

  let results;
  switch (appState) {
    case "gameData":
      results = gameData;
      break;
    case "searchResults":
      results = searchResults;
      break;
    default:
      results = gameData;
  }

  return (
    <div className={classes.root}>
      <ThemeProvider theme={darkTheme}>
        <div>
          {latest && <Carousel gameData={gameData} latestGames={latest} />}
          <Container className="search-field">
            <TextField
              label="Search for a game title"
              placeholder="eg: Call of duty, Fifa, Far cry"
              className={classes.searchMargin}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></TextField>
            <Button
              variant="contained"
              className="search-btn"
              onClick={getSearchResults}
            >
              Search
            </Button>
            {error && (
              <p style={{ textAlign: "center", fontSize: 30, color: "white" }}>
                {error}
              </p>
            )}
          </Container>
          {isLoading ? (
            <div className="loading-text">
              Loading...
              <br />
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <>
              {gameData && (
                <SearchResults gameData={results} term={searchTerm} />
              )}
            </>
          )}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Search;
