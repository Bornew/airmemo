import React, { useState, useEffect, useRef } from "react";
import "./FeedItem.css";
import {useHover} from './../../../hooks/useHover';
import { Share } from "@icon-park/react";

const FeedItem = (props) => {
  const { date, content } = props;
  const [ref, active] = useHover();
  return (
    <div className="feed-wrapper" ref={ref}>
      <div className="feed-topbar">
        <div className="feed-topbar-date">{date}</div>
        {active && (
          <div className="feed-topbar-icon">
            <Share
              theme="outline"
              size="16"
              fill="#7D7D7D"
              strokeWidth={3}
              strokeLinecap="butt"
            />
          </div>
        )}
      </div>
      <div className="feed-content">{content}</div>
    </div>
  );
};

export default FeedItem;
