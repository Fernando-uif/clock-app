import { useEffect, useState } from "react";

export const useFetch = <T>(url: string) => {
  const [info, setInfo] = useState<T | null>(null);
  useEffect(() => {
    fetch(url)
      .then((data) =>
        data.json().then((data: T) => {
          if(data)
          setInfo(data || null);
        })
      )
  }, [url]);
  if(!info) return null;
  return info ;
};
