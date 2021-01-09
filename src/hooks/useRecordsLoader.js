import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "./../config";

const useRecordsLoader = (url, deps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };
  useEffect(() => {
    setLoading(true);
    console.log("still loading");
    console.log("url", url);
    axios
      .get(url, { headers })
      .then((result) => {
        const records = handleRecordsData(result.data.records);
        setData(records);
        setLoading(false);
      })
      .catch((e) => {
        console.log(`error! ${e}`);
      });
  }, deps);
  return [data, loading];
};

const handleRecordsData = (records) => {
  for (let record of records) {
    record.createdTime = record.createdTime.replace(/T/, " ");
    record.createdTime = record.createdTime.replace(/.000Z/, "");
    /*record.createdTime = new Date(record.createdTime);*/
  }
  records = records.sort((record1, record2) => {
    return getDateTime(record2.createdTime) - getDateTime(record1.createdTime);
    // return record1.createdTime - record2.createdTime;
  });
  return records;
};

const getDateTime = (date) => {
  date = date.substring(0, 19);
  date = date.replace(/-/g, "/");
  const timestamp = new Date(date).getTime();
  console.log(timestamp);
  return timestamp;
  // // 根据毫秒数构建 Date 对象
  // date = new Date(timestamp);
  // // 格式化日期
  // const dateTime = date.toLocaleString();
  // return dateTime;
};
export default useRecordsLoader;
