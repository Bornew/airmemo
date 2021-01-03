import React, { useCallback, useState } from "react";
import "./TabItem.css";

const TabItem = (props) => {
  const { tabIndex, tabName, isActive, setActiveTab } = props;
  const handleClickTab = useCallback(() => {
    setActiveTab(tabIndex);
    console.log(typeof setActiveTab);
  }, [tabIndex, setActiveTab]);
  return isActive ? (
    <li className="tab-name-active" onClick={handleClickTab}>{tabName}</li>
  ) : (
    <li className="tab-name-default" onClick={handleClickTab}>{tabName}</li>
  );
};
TabItem.defaultProps = {
  isActive: false,
};

export default TabItem;
