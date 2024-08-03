import { useState } from "react";
import { clsx } from "clsx";

import { useFetch } from "../hooks/useFetch";
import { StatusDay } from "./StatusDay";
import { LocalTime } from "../interfaces/Time.interface";

import Icon from "./Icon";
import { getDayOfTheWeek } from "../helpers/getDayOfTheWeek";

export const GetTime = () => {
  const [localHour, setlocalHour] = useState(
    new Date().getHours().toString().padStart(2, "00")
  );
  const [localMinutes, setLocalMinutes] = useState(
    new Date().getMinutes().toString().padStart(2, "00")
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const localZone =
    useFetch<LocalTime>("https://worldtimeapi.org/api/ip") || null;

  const localTimeZone = localZone?.timezone.replace("/", "-").replace("_", " ");
  setTimeout(() => {
    setlocalHour(new Date().getHours().toString().padStart(2, "00"));
    setLocalMinutes(new Date().getMinutes().toString().padStart(2, "00"));
  }, 1000 * 60);

  const localTime = new Date(localZone?.utc_datetime || new Date());

  const handleClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  const isMorning = new Date().getHours() < 20;

  return (
    <>
      <div
        className={clsx(
          "bottom-0 left-0 right-0 transition-all duration-[.4s] fixed",
          {
            "translate-y-[0]": isModalOpen,
            "translate-y-[50%]": !isModalOpen,
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
        <span className="block text-light font-bold leading-[1.75rem] tracking-[0.1875rem] uppercase pl-[1.62rem] mt-1 select-none">
          {localTimeZone}
        </span>

        {/* Modal */}
        <div className="pt-[3rem]">
          <div
            className={clsx(
              "bottom-0 left-0 right-0 transition-all duration-[.4s]"
            )}
          >
            <div className="pb-[40px]">
              <button
                className={`
            bg-light flex  h-[39px] items-center justify-center leading-[0.875rem] gap-[15px] rounded-[1.75rem] uppercase w-[115px] pt-[13px] pl-[17px] pb-[12px] pr-[7px] -top-[73px] left-[1.62rem] ml-[20px]`}
              >
                <div className="font-semibold opacity-[.5] text-[12px]  text-black tracking-[3.75px]">
                  {!isModalOpen ? "more" : "less"}
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
            <div
              className={clsx(
                " backdrop-blur-[20px]  h-[256px] left-0 right-0 px-[17px] py-[48px] flex flex-col gap-[16px] text-black bottom-0 z-50 ",

                {
                  "text-light bg-[rgba(255,255,255,.75)]": isMorning,
                  "bg-[rgba(0,0,0.75)]": !isMorning,
                }
              )}
            >
              <div className="flex justify-between gap-[40px]">
                <div
                  className={clsx(
                    "text-[10px] font-normal leading-[28px] uppercase tracking-[2px]",
                    {
                      "text-[#303030]": isMorning,
                      "text-light": !isMorning,
                    }
                  )}
                >
                  CURRENT TIMEZONE
                </div>
                <div
                  className={clsx("text-[20px] font-bold", {
                    "text-[#303030]": isMorning,
                    "text-light": !isMorning,
                  })}
                >
                  {localZone?.timezone.replace("_", " ")}
                </div>
              </div>
              <div className="flex justify-between gap-[40px]">
                <div
                  className={clsx(
                    " text-[10px] font-normal leading-[28px] uppercase tracking-[2px]",
                    {
                      "text-[#303030]": isMorning,
                      "text-light": !isMorning,
                    }
                  )}
                >
                  Day of the year
                </div>
                <div className="text-[#303030] text-[20px] font-bold">
                  {localZone?.day_of_year}
                </div>
              </div>
              <div className="flex justify-between gap-[40px]">
                <div
                  className={clsx(
                    " text-[10px] font-normal leading-[28px] uppercase tracking-[2px]",
                    {
                      "text-[#303030]": isMorning,
                      "text-light": !isMorning,
                    }
                  )}
                >
                  Day of the week
                </div>
                <div className="text-[#303030] text-[20px] font-bold">
                  {getDayOfTheWeek(Number(localZone?.day_of_week))}
                </div>
              </div>
              <div className="flex justify-between gap-[40px]">
                <div
                  className={clsx(
                    " text-[10px] font-normal leading-[28px] uppercase tracking-[2px]",
                    {
                      "text-[#303030]": isMorning,
                      "text-light": !isMorning,
                    }
                  )}
                >
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
