import React, { useState, useRef, useCallback, useEffect } from "react";
import "./WaterfallView.css";
import TabItem from "./TabItem";
import FeedList from "./FeedList";
import TodoList from './TodoList';
import useRecordsLoader from "../../hooks/useRecordsLoader";
import { BASE_URL, TABLE_MEMO_URL } from "./../../config";

console.log("TABLE_MEMO_URL", TABLE_MEMO_URL);

const WaterfallView = () => {
  const tabArr = ["TODO", "FEED", "FLOW"];
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const refArr = [ref1, ref2, ref3];
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [recordsArr, loading] = useRecordsLoader(TABLE_MEMO_URL, []);
  console.log("typeof recordsArr", typeof recordsArr, recordsArr, loading);
  const handleClickTab = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const setActiveTab = useCallback(
    (index) => {
      setActiveTabIndex(index);
      handleClickTab(refArr[index]);
    },
    [refArr]
  );
  return (
    <div className="waterfall-wrapper">
      <div className="waterfall-tabs">
        {tabArr.map((tabItem, index) => (
          <TabItem
            tabIndex={index}
            tabName={tabItem}
            isActive={index === activeTabIndex}
            setActiveTab={setActiveTab}
          />
        ))}
      </div>
      <div className="waterfall-content">
        <TodoList />
        <FeedList />
      </div>
    </div>
  );
};
export default WaterfallView;
