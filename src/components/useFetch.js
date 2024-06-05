import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [gameData, setGameData] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const controller = new AbortController();
  const signal = controller.signal;

  useEffect(() => {
    const getdata = async () => {
      try {
        const fetchData = await fetch(url, { signal });
        const jsonData = await fetchData.json();
        const data = await jsonData;

        setGameData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setFetchError(error);
      }
    };

    getdata();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { gameData, fetchError, isLoading };
};

export default useFetch;
