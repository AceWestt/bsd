import axios from "axios";
import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [url]);

  return data;
};
