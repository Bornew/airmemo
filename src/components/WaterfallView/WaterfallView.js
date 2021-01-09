import React, { useState, useRef, useCallback, useEffect } from "react";
import "./WaterfallView.css";
import TabItem from "./TabItem";
import FeedItem from "./FeedItem";
import useRecordsLoader from "../../hooks/useRecordsLoader";
import { BASE_URL, TABLE_MEMO_URL } from "./../../config";

console.log("TABLE_MEMO_URL", TABLE_MEMO_URL);

const WaterfallView = () => {
  const tabArr = ["TODO", "FEED", "FLOW"];
  // const mockFeed = [
  //   {
  //     createdTime: "2020-10-01",
  //     fields: {
  //       memo:
  //         "最近心情很烦躁。虚度不少时间，脑子好像经常不太舒服，又觉得时间真的紧。哎。我试图让omnifocus变成一个我不需要动脑想我当下要做什么的任务管理驱动器。我只管#push#上去，靠机器自动分发任务，也就是我自动#pull#当前任务。但是我没有做好。↵↵昨天刚和另一个实习生讨论同步的问题。她问我多个设备，多个课表，每个设备上有登陆了账号且同步云端的，有登陆了账号仅存在本地的，有没登陆只在本地的，设备间的同步逻辑问题。以往是只保留一个课表，要么选当前设备本地的，要么选云端唯一的一个课表。我给她说的解法是，1. 后台自动push到云端，但同步得询问用户要不要pull下来。2. 云端和本地取并集。举个例子：设备A只要登陆了账号，就自动push到云端；设备B要是登陆了账号，询问要不要pull下来，选择不要就在设备B上创建课表，再传到云端，选择要就始终保持和那个课表的同步。云端这样就有了多份课表。设备A或者B之后都能自己选择要不要同步其他课表。同步，就取个并集。因为一个家庭设备id可能用的同一个，但不希望课表是之前的，丢了就丢了；而且多个孩子，这样可以只用一个id，多台手机不同孩子的课表 / 一台手机多个孩子的课表。↵↵废话连篇的，绕回来，我的意思就是，自动push，但手动pull。因为决策权在人，存储靠机器托管。前者让人有“掌控感”，自定义程度高；后者让人有“安全感”，不需要操心的问题少。↵↵对比一下，感觉任务管理是相反逻辑，很神奇。其实是因为，任务管理是反大脑性能的，反人性的。人有惰性，人还记不住事情。哎。↵↵我也不知道我在说什么。就当作试试看airtable版omnifocus的MVP记事本吧。↵↵#碎片↵#任务管理↵#记事本↵#omnifocus",
  //       tag: ["碎片", "任务管理", "记事本", "omnifocus"],
  //       time: "2020-12-24T17:25:13.000Z",
  //     },
  //   },
  //   {
  //     createdTime: "2020-10-01",
  //     fields: {
  //       memo:
  //         "学会将自己的忧虑拆分，思考其本质原因。1. 思维僵化，也许是缺少了可对接的信息源，我需要寻找合适的答疑人，有效的方法，而不是盲目走在一个方向上，逐渐迷失；2. 自我膨胀，时时刻刻要自我提醒，追求绝对成长；3. 焦虑，写下来，正如我现在在做的事情；4. 枯燥，尝试去找新的空间新的挑战新的动力，或者适当降低预期；5. 真理，时常陷入求索中的形而上状态，过于虚无，还是应该溯因推理；6. 工具不好用，寻找更好的工具链，更合适的workflow，努力让自己自然。\n" +
  //         "\n" +
  //         "> 内部陷阱是指，因为内部情绪，导致的忧虑感。典型表现有思维僵化（可以放慢脚步）、自我膨胀（哪怕装出来也要谦虚）、焦虑（写下来然后寻找更多信息消除不确定性）、枯燥（不设置结束点，尤其是新工作；或者降低预期）、真理（考虑「无」的状态，扩大问题预设）、工具不好用（更换工具、环境或锻炼肌肉的精确性）\n" +
  //         "\n" +
  //         "#焦虑\n" +
  //         "#内部陷阱\n" +
  //         "#心态\n",
  //       tag: ["焦虑", "心态", "内部陷阱"],
  //       time: "2020-12-24T17:25:13.000Z",
  //     },
  //   },
  // ];
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const refArr = [ref1, ref2, ref3];
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [recordsArr, loading] = useRecordsLoader(TABLE_MEMO_URL, []);
  console.log(
    "typeof recordsArr",
    typeof recordsArr,
    recordsArr,
    loading
  );
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
        {loading && !recordsArr ? (
          <p>loading...</p>
        ) : (
          recordsArr.map((record) => {
            return (
              <FeedItem
                date={record.createdTime}
                content={record.fields.memo}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
export default WaterfallView;
