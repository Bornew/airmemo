import React, { useEffect, useState } from "react";
import axios from "axios";

const useRecordsLoader = (url, deps) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get(url).then((result) => {
            setData(result.data);
            setLoading(false);
        }).catch(e => {
            console.log(`error! ${e}`);
        });
    }, deps);
    return [data, loading];
};
export default useRecordsLoader;