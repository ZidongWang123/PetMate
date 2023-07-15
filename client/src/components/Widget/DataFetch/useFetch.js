
import { useState, useEffect } from "react";
import React from "react";

const useFetch = (url,method="GET") => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  /*   const handleDelete = (id) => {
    const newData = data.filter((data) => data.id !== id);
    setData(newData); 
  };*/

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal,method })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortCont.abort();
  }, [url]);
  return { data, isPending, error };
};

export default useFetch;
