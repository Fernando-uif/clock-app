import { useContext, useState } from "react";
import { clsx } from "clsx";

import { useFetch } from "../hooks/useFetch";
import { StatusDay } from "./StatusDay";
import { LocalTime } from "../interfaces/Time.interface";

import Icon from "./Icon";
import { getDayOfTheWeek } from "../helpers/getDayOfTheWeek";
import styles from "../styles/icon/icon.module.css";

import { ToggleContext } from "../context/ToggleContext";

export const GetTime = () => {
  const { isOn: isModalOpen, setIsOn } = useContext(ToggleContext);

  const [localHour, setlocalHour] = useState(
    new Date().getHours().toString().padStart(2, "00")
  );

  const [localMinutes, setLocalMinutes] = useState(
    new Date().getMinutes().toString().padStart(2, "00")
  );

  const localZone =
    useFetch<LocalTime>("https://worldtimeapi.org/api/ip") || null;

  const localTimeZone = localZone?.timezone.replace("/", "-").replace("_", " ");
  const localTime = new Date(localZone?.utc_datetime || new Date());

  setTimeout(() => {
    setlocalHour(new Date().getHours().toString().padStart(2, "00"));
    setLocalMinutes(new Date().getMinutes().toString().padStart(2, "00"));
  }, 1000 * 60);

  const isMorning = new Date().getHours() < 20;
  console.log(localZone?.timezone.replace("_", " ").split("/")[1], "info");
  return (
    <>
      <div
        className={clsx(
          "bottom-0 left-0 right-0 transition-all duration-[.4s] fixed",
          {
            "translate-y-[0]": isModalOpen,
            "translate-y-[55%] md:translate-y-[55%] xl:translate-y-[60%]":
              !isModalOpen,
          }
        )}
      >
        <div className="xl:flex xl:items-end justify-between">
          <div>
            <StatusDay
              statusDay={
                localTime.getHours() >= 0 && localTime.getHours() < 12
                  ? "morning"
                  : localTime.getHours() >= 12 && localTime.getHours() < 20
                  ? "evening"
                  : "night"
              }
              time={[localHour || "--", localMinutes || "--"]}
              completeTime={localTime}
            />
            <span className="block text-light font-bold leading-[1.75rem] tracking-[0.1875rem] uppercase pl-[1.62rem] mt-1 select-none xl:pl-[10.31rem]">
              {localTimeZone}
            </span>
          </div>
          <div>
            <button
              className={`
            bg-light flex  h-[39px] items-center justify-center leading-[0.875rem] gap-[15px] rounded-[1.75rem] uppercase w-[115px] pt-[13px] pl-[17px] pb-[12px] pr-[7px] -top-[73px] left-[1.62rem] ml-[20px] mt-5 md:h-[3.5rem] md:w-[9.125rem]  md:justify-between  md:p-[.175rem] md:pl-[25px] md:pr-[7px] xl:mr-[165px]`}
            >
              <div className="font-semibold opacity-[.5] text-xs  text-black tracking-[3.75px] md:text-base">
                {!isModalOpen ? "more" : "less"}
              </div>
              <Icon
                name="arrow"
                className={clsx(`block ${styles["buttonInfo"]}`, {
                  "rotate-[180deg] transition-all": isModalOpen,
                  "rotate-[0deg] transition-all": !isModalOpen,
                })}
                onClick={() => setIsOn((prev) => !prev)}
              />
            </button>
          </div>
        </div>

        {/* Modal */}
        <div className="pt-[3rem] md:pt-[2rem]">
          <div
            className={clsx(
              "bottom-0 left-0 right-0 transition-all duration-[.4s]"
            )}
          >
            <div
              className={clsx(
                `backdrop-blur-[20px]  h-[256px] left-0 right-0 px-[17px] py-[48px] flex flex-col gap-[16px] text-black bottom-0 z-50 md:grid md:grid-cols-2 md:h-[24.5rem]  md:p-[3rem] ${styles["line"]} xl:pl-[155px] xl:pr-[155px]`,

                {
                  "text-light bg-[rgba(255,255,255,.75)]": isMorning,
                  "bg-[rgba(0,0,0.75)]": !isMorning,
                }
              )}
            >
              <div className="flex justify-between gap-[40px] md:flex-col md:gap-0 md:[justify-content:unset]">
                <div
                  className={clsx(
                    "text-[10px] font-normal leading-[28px] uppercase tracking-[2px] md:text-[.81rem] md:leading-[1.75rem]",
                    {
                      "text-[#303030]": isMorning,
                      "text-light": !isMorning,
                    }
                  )}
                >
                  CURRENT TIMEZONE
                </div>
                <div
                  className={clsx(
                    "text-[20px] font-bold md:text-[2.5rem] md:leading-normal",
                    {
                      "text-[#303030]": isMorning,
                      "text-light": !isMorning,
                    }
                  )}
                >
                  {localZone?.timezone.replace("_", " ")?.split("/")?.[1] ||
                    localZone?.timezone.replace("_", " ") ||
                    "No place"}
                </div>
              </div>
              <div className="flex justify-between gap-[40px] md:flex-col md:gap-0 md:[justify-content:unset] md:items-end">
                <div
                  className={clsx(
                    " text-[10px] font-normal leading-[28px] uppercase tracking-[2px] md:text-[.81rem] md:leading-[1.75rem]",
                    {
                      "text-[#303030]": isMorning,
                      "text-light": !isMorning,
                    }
                  )}
                >
                  Day of the year
                </div>
                <div
                  className={clsx(
                    "text-[#303030] text-[20px] font-bold md:text-[2.5rem] md:leading-normal",
                    {
                      "text-[#303030]": isMorning,
                      "text-light": !isMorning,
                    }
                  )}
                >
                  {localZone?.day_of_year}
                </div>
              </div>
              <div className="flex justify-between gap-[40px] md:flex-col md:gap-0 md:[justify-content:unset]">
                <div
                  className={clsx(
                    " text-[10px] font-normal leading-[28px] uppercase tracking-[2px] md:text-[.81rem] md:leading-[1.75rem]",
                    {
                      "text-[#303030]": isMorning,
                      "text-light": !isMorning,
                    }
                  )}
                >
                  Day of the week
                </div>
                <div
                  className={clsx(
                    "text-[#303030] text-[20px] font-bold md:text-[2.5rem] md:leading-normal",
                    {
                      "text-[#303030]": isMorning,
                      "text-light": !isMorning,
                    }
                  )}
                >
                  {getDayOfTheWeek(Number(localZone?.day_of_week))}
                </div>
              </div>
              <div className="flex justify-between gap-[40px] md:flex-col md:gap-0 md:[justify-content:unset] md:items-end">
                <div
                  className={clsx(
                    " text-[10px] font-normal leading-[28px] uppercase tracking-[2px] md:text-[.81rem] md:leading-[1.75rem]",
                    {
                      "text-[#303030]": isMorning,
                      "text-light": !isMorning,
                    }
                  )}
                >
                  week number
                </div>
                <div
                  className={clsx(
                    "text-[#303030] text-[20px] font-bold md:text-[2.5rem] md:leading-normal",
                    {
                      "text-[#303030]": isMorning,
                      "text-light": !isMorning,
                    }
                  )}
                >
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
