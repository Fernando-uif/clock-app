import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [info, setInfo] = useState("");
  useEffect(() => {
    fetch(url).then((data) =>
      data.json().then((data) => {
        setInfo(data);
      })
    );
  }, [url]);
  return [info];
};
