import { ChangeEvent, Children, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { StatusDay } from "./StatusDay";
import { LocalTime } from "../interfaces/Time.interface";

export const GetTime = () => {
  // Pedir la ubicacion y asi colocar la fecha y hora \o/
  const [localHour, setlocalHour] = useState(
    new Date().getHours().toString().padStart(2, "00")
  );
  const [localMinutes, setLocalMinutes] = useState(
    new Date().getMinutes().toString().padStart(2, "00")
  );

  const timeZones =
    useFetch<string[]>("http://worldtimeapi.org/api/timezone") || [];

  const localZone =
    useFetch<LocalTime>("http://worldtimeapi.org/api/ip") || null;
  const localTimeZone = localZone?.timezone.replace("/", "-").replace("_", " ");
  setTimeout(() => {
    setlocalHour(new Date().getHours().toString().padStart(2, "00"));
    setLocalMinutes(new Date().getMinutes().toString().padStart(2, "00"));
  }, 1000 * 60);


  const localTime = new Date(localZone?.utc_datetime || new Date());

  const handleChangeZone = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("change");
    console.log(e.target.value, "e");
  };

  return (
    <>
      <div className="m-auto flex flex-col gap-2 w-[18rem]">
        <select
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => {
            handleChangeZone(e);
          }}
        >
          <option value="">Select a timezone</option>
          {Children.toArray(
            timeZones.map((zone) => {
              return (
                <>
                  <option value={zone}>{zone}</option>
                </>
              );
            })
          )}
        </select>
        {/* <select className="rounded h-[3rem] p-3">
          <option value="">Select a region</option>
        </select> */}
      </div>

      <StatusDay
        statusDay={
          localTime.getHours() >= 0 && localTime.getHours() < 12
            ? "morning"
            : localTime.getHours() >= 12 && localTime.getHours() <= 20
            ? "evening"
            : "night"
        }
        time={[localHour || "--", localMinutes || "--"]}
      />
      <span className="block text-light font-bold leading-[1.75rem] tracking-[0.1875rem] uppercase pl-[1.62rem] mt-1">
        {localTimeZone}
      </span>
    </>
  );
};
