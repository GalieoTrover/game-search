import { useState } from "react";
import Carousel from "./Carousel";
import SearchResults from "./SearchResults";
/* Material-UI imports */
import { TextField, Container, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import RefreshIcon from "@material-ui/icons/Refresh";
import { createTheme, ThemeProvider } from "@material-ui/core";
import useFetch from "./useFetch";

const Search = ({ classes }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [appState, setAppState] = useState("gameData");

  let currentYear = new Date().getFullYear();

  const { gameData, fetchError, isLoading } = useFetch(
    `https://api.rawg.io/api/games?key=208b3bfe90d940ba9127c24125bae44b&dates=${currentYear}-01-01,${currentYear}-12-31&page_size=30`
  );

  const { gameData: dataSearchResults } = useFetch(
    `https://api.rawg.io/api/games?key=208b3bfe90d940ba9127c24125bae44b&search_exact=true&search=${searchTerm}&page_size=15&exclude_additions=true`
  );

  const getSearchResults = () => {
    setSearchResults(dataSearchResults);
    setAppState("searchResults");
  };

  const resetAppState = () => {
    setAppState("gameData");
    setSearchTerm("");
  };

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
          {gameData.length !== 0 && <Carousel latestGames={gameData} />}
          <Container className="search-field">
            {appState === "searchResults" && (
              <RefreshIcon
                className="search-field--reseticon"
                onClick={resetAppState}
              />
            )}
            <TextField
              label="Search for a game title"
              placeholder="eg: Call of duty, Fifa, Far cry"
              className={classes.searchMargin}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></TextField>
            <Button
              variant="contained"
              className="search-btn"
              onClick={getSearchResults}
            >
              Search
            </Button>
            {fetchError && (
              <p style={{ textAlign: "center", fontSize: 30, color: "white" }}>
                {fetchError}
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
              {results.length !== 0 && (
                <SearchResults gameData={results} appState={appState} />
              )}
            </>
          )}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Search;
