import React, { useState, useEffect } from "react";
import "./FeedItem.css";
import { Share } from "@icon-park/react";

const FeedItem = (props) => {
  const { date, content } = props;
  return (
    <div className="feed-wrapper">
      <div className="feed-topbar">
        <div className="feed-topbar-date">{date}</div>
        <div className="feed-topbar-icon">
          <Share
            theme="outline"
            size="16"
            fill="#7D7D7D"
            strokeWidth={3}
            strokeLinecap="butt"
          />
        </div>
      </div>
      <div className="feed-content">{content}</div>
    </div>
  );
};

export default FeedItem;
