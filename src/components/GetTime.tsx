import {  useState } from "react";
import { clsx } from "clsx";

import { useFetch } from "../hooks/useFetch";
import { StatusDay } from "./StatusDay";
import { LocalTime } from "../interfaces/Time.interface";

import Icon from "./Icon";

export const GetTime = () => {
  const [localHour, setlocalHour] = useState(
    new Date().getHours().toString().padStart(2, "00")
  );
  const [localMinutes, setLocalMinutes] = useState(
    new Date().getMinutes().toString().padStart(2, "00")
  );
  // const [selectTimeZone, setSelectTimeZone] = useState("");
  // const [selectRegion, setselectRegion] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const timeZones =
  //   useFetch<string[]>("http://worldtimeapi.org/api/timezone") || [];

  const localZone =
    useFetch<LocalTime>("http://worldtimeapi.org/api/ip") || null;

  const localTimeZone = localZone?.timezone.replace("/", "-").replace("_", " ");
  setTimeout(() => {
    setlocalHour(new Date().getHours().toString().padStart(2, "00"));
    setLocalMinutes(new Date().getMinutes().toString().padStart(2, "00"));
  }, 1000 * 60);

  const localTime = new Date(localZone?.utc_datetime || new Date());

  // const handleChangeZone = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setSelectTimeZone(e.target.value);
  // };
  // useEffect(() => {
  //   if (selectTimeZone) {
  //     fetch(`http://worldtimeapi.org/api/timezone/${selectTimeZone}`).then(
  //       (data) =>
  //         data.json().then((data) => {
  //           console.log(data, "data");
  //           setselectRegion(data);
  //         })
  //     );
  //   }
  //   return () => {};
  // }, [selectTimeZone]);
  const handleClick = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <>
      <div className="m-auto flex flex-col gap-2 w-[18rem] pl-[1.5rem]">
        {/* <select
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
        </select> */}

        {/* {selectRegion.length > 0 && (
          <select className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Select a region</option>
            {selectRegion.map((zone) => {
              console.log(zone);
              return <></>;
            })}
          </select>
        )} */}
      </div>

      <div
        className={clsx(
          "bottom-0 left-0 right-0 transition-all duration-[.4s] fixed",
          {
            "translate-y-[0]": isModalOpen,
            "translate-y-[50%]": isModalOpen,
          }
        )}
      >
        <StatusDay
          statusDay={
            localTime.getHours() >= 0 && localTime.getHours() < 12
              ? "morning"
              : localTime.getHours() >= 12 && localTime.getHours() < 20
              ? "evening"
              : "night"
          }
          time={[localHour || "--", localMinutes || "--"]}
        />
        <span className="block text-light font-bold leading-[1.75rem] tracking-[0.1875rem] uppercase pl-[1.62rem] mt-1">
          {localTimeZone}
        </span>

        {/* Modal */}
        <div className="pt-[3rem]">
          <div
            className={clsx(
              "bottom-0 left-0 right-0 transition-all duration-[.4s]",
              // {
              //   "translate-y-[0]": isModalOpen,
              //   "translate-y-[80%]": isModalOpen,
              // }
            )}
          >
            <div className="pb-[40px]">
              <button
                className={`
            bg-light flex  h-[39px] items-center justify-center leading-[0.875rem] gap-[15px] rounded-[1.75rem] uppercase w-[115px] pt-[13px] pl-[17px] pb-[12px] pr-[7px] -top-[73px] left-[1.62rem] ml-[20px]`}
              >
                <div className="font-semibold opacity-[.5] text-[12px]  text-black tracking-[3.75px]">
                  more
                </div>
                <Icon
                  name="arrow"
                  className={clsx("block", {
                    "rotate-[180deg] transition-all": isModalOpen,
                    "rotate-[0deg] transition-all": !isModalOpen,
                  })}
                  onClick={handleClick}
                />
              </button>
            </div>
            <div className="text-light bg-[rgba(255,255,255,.75)] backdrop-blur-[20px]  h-[256px] left-0 right-0 px-[17px] py-[48px] flex flex-col gap-[16px] text-black bottom-0 z-50 ">
              <div className="flex justify-between gap-[40px]">
                <div className="text-[#303030] text-[10px] font-normal leading-[28px] uppercase tracking-[2px]">
                  CURRENT TIMEZONE
                </div>
                <div className="text-[#303030] text-[20px] font-bold">
                  {localZone?.timezone.replace("_", " ")}
                </div>
              </div>
              <div className="flex justify-between gap-[40px]">
                <div className="text-[#303030] text-[10px] font-normal leading-[28px] uppercase tracking-[2px]">
                  Day of the year
                </div>
                <div className="text-[#303030] text-[20px] font-bold">
                  {localZone?.day_of_year}
                </div>
              </div>
              <div className="flex justify-between gap-[40px]">
                <div className="text-[#303030] text-[10px] font-normal leading-[28px] uppercase tracking-[2px]">
                  Day of the week
                </div>
                <div className="text-[#303030] text-[20px] font-bold">
                  {localZone?.day_of_week}
                </div>
              </div>
              <div className="flex justify-between gap-[40px]">
                <div className="text-[#303030] text-[10px] font-normal leading-[28px] uppercase tracking-[2px]">
                  week number
                </div>
                <div className="text-[#303030] text-[20px] font-bold">
                  {localZone?.week_number}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
