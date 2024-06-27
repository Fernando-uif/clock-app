import Icon from "./Icon";
import style from "../styles/icon/icon.module.css";
import { Hour } from "./Hour";
interface StatusDayProps {
  statusDay: "morning" | "night" | "evening";
  time: string[];
}
export const StatusDay = ({ statusDay, time }: StatusDayProps) => {
  const regardsDay = {
    morning: "GOOD MORNING",
    evening: "GOOD EVENING",
    night: "GOOD NIGHT",
  };
  return (
    <>
      <div className="mt-[5rem] flex gap-[1rem] pl-[1.62rem]">
        <Icon
          name={
            statusDay === "morning" || statusDay === "evening" ? "sun" : "moon"
          }
          className={`${style["icon"]}`}
        />
        <span
          className={`text-[1.125rem] font-normal tracking-[0.225rem] uppercase text-light`}
        >
          {statusDay === "morning"
            ? regardsDay.morning
            : statusDay === "evening"
            ? regardsDay.evening
            : regardsDay.night}
        </span>
      </div>
      <Hour time={time} />
    </>
  );
};
