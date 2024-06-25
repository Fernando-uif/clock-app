import { Children } from "react";
import { useFetch } from "../hooks/useFetch";

export const GetTime = () => {
  //   const [timeZones] = useFetch("http://worldtimeapi.org/api/timezone");
  //   console.log(info, "tenemos info");

  return (
    <>
      <select className="rounded h-8 p-3">
        <option value="">Select an option</option>
        <option value=""></option>
      </select>
      <select>
        <option value="">Select an option</option>
      </select>
      <select>
        <option value="">Select an option</option>
      </select>
    </>
  );
};
