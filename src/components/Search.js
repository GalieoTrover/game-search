import { useState, useEffect } from "react";
import Carousel from "./Carousel";
import SearchResults from "./SearchResults";
/* Material-UI imports */
import { TextField, Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createTheme, ThemeProvider } from "@material-ui/core";

const Search = ({ classes }) => {
  const [gameData, setGameData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=208b3bfe90d940ba9127c24125bae44b&search_exact=true&search=${searchTerm}&page_size=15&exclude_additions=true&dates=2021-01-01,2022-12-31`
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
  }, [searchTerm]);

  const randomize = function () {
    const randomId = Math.floor(Math.random() * 100);

    fetch(
      `https://api.rawg.io/api/games/${randomId}?key=208b3bfe90d940ba9127c24125bae44b`
    )
      .then((res) => res.json())
      .then((data) => setSearchTerm(data.name));
  };

  useEffect(() => {
    fetch(
      "https://api.rawg.io/api/games?key=208b3bfe90d940ba9127c24125bae44b&dates=2023-01-01,2023-12-31&page_size=30"
    )
      .then((res) => res.json())
      .then((data) => setLatest(data));
  }, []);

  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });

  return (
    <div className={classes.root}>
      <ThemeProvider theme={darkTheme}>
        <div>
          {latest && <Carousel gameData={gameData} latestGames={latest} />}
          <Container style={{ padding: "0 14px" }}>
            <TextField
              label="Search for a game title"
              placeholder="eg: Call of duty, Fifa, Far cry"
              className={classes.searchMargin}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></TextField>
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
                <SearchResults
                  gameData={gameData}
                  term={searchTerm}
                  random={randomize}
                />
              )}
            </>
          )}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Search;
