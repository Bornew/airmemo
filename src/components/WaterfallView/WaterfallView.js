import React, { useState, useRef, useCallback } from "react";
import "./WaterfallView.css";
import TabItem from "./TabItem";
import FeedItem from "./FeedItem";

const WaterfallView = () => {
  const tabArr = ["TODO", "FEED", "FLOW"];
  const mockFeed = [
    {
      key: 0,
      date: "2020-10-01",
      content:
        "智力与使命共同体这一点上，GitHub 所构建的协作形态是非常先进的，Figma，Notion，Airtable 还都在非常早期阶段。如果说工具的使用能激发心流，达到人机合一（不管是代码，设计还是音乐的创作者都应该体验过这种畅快淋漓的感受吧？），社会性协作也能使被共同使命驱动的创造者们达到集体合一的状态，使命与智力共同体突破时间，空间与公司制的边界。",
    },
    {
      key: 1,
      date: "2020-10-01",
      content:
        "智力与使命共同体这一点上，GitHub 所构建的协作形态是非常先进的，Figma，Notion，Airtable 还都在非常早期阶段。如果说工具的使用能激发心流，达到人机合一（不管是代码，设计还是音乐的创作者都应该体验过这种畅快淋漓的感受吧？），社会性协作也能使被共同使命驱动的创造者们达到集体合一的状态，使命与智力共同体突破时间，空间与公司制的边界。",
    },
    {
      key: 1,
      date: "2020-10-01",
      content:
        "智力与使命共同体这一点上，GitHub 所构建的协作形态是非常先进的，Figma，Notion，Airtable 还都在非常早期阶段。如果说工具的使用能激发心流，达到人机合一（不管是代码，设计还是音乐的创作者都应该体验过这种畅快淋漓的感受吧？），社会性协作也能使被共同使命驱动的创造者们达到集体合一的状态，使命与智力共同体突破时间，空间与公司制的边界。",
    },
    {
      key: 1,
      date: "2020-10-01",
      content:
        "智力与使命共同体这一点上，GitHub 所构建的协作形态是非常先进的，Figma，Notion，Airtable 还都在非常早期阶段。如果说工具的使用能激发心流，达到人机合一（不管是代码，设计还是音乐的创作者都应该体验过这种畅快淋漓的感受吧？），社会性协作也能使被共同使命驱动的创造者们达到集体合一的状态，使命与智力共同体突破时间，空间与公司制的边界。",
    },
  ];
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const refArr = [ref1, ref2, ref3];
  const [activeTabIndex, setActiveTabIndex] = useState(0);
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
        {mockFeed.map((feedItem) => (
          <FeedItem date={feedItem.date} content={feedItem.content} />
        ))}
      </div>
    </div>
  );
};
export default WaterfallView;
