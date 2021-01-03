import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "./../config";

const useRecordsLoader = (url, deps) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };
  useEffect(() => {
    setLoading(true);
    console.log("still loading");
    axios
      .get({
        url,
        headers,
      })
      .then((result) => {
        console.log(result.data);
        setData(result.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(`error! ${e}`);
      });
  }, deps);
  return [data, loading];
};

export default useRecordsLoader;
