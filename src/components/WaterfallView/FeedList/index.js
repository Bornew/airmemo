import FeedItem from "./FeedItem.js";
import useRecordsLoader from "../../../hooks/useRecordsLoader";
import { TABLE_MEMO_URL } from "../../../config";
import TabItem from "../TabItem";

export default () => {
  const [recordsArr, loading] = useRecordsLoader(TABLE_MEMO_URL, []);
  console.log("typeof recordsArr", typeof recordsArr, recordsArr, loading);
  return loading && !recordsArr ? (
    <p>loading...</p>
  ) : (
    recordsArr.map((record) => {
      return (
        <FeedItem date={record.createdTime} content={record.fields.memo} />
      );
    })
  );
};
