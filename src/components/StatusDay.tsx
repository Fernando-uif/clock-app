import Icon from "./Icon";
import style from "../styles/icon/icon.module.css";

interface StatusDayProps {
  statusDay: "morning" | "night";
}
export const StatusDay = ({ statusDay }: StatusDayProps) => {
  const regardsDay = {
    morning: "GOOD MORNING",
    night: "GOOD EVENING, IT’S CURRENTLY",
  };
  return (
    <div className="pt-[14rem]">
      <Icon name="sun" className={`${style["icon"]}`} />
      <span
        className={`text-[1.125rem] font-normal tracking-[0.225rem] uppercase text-light`}
      >
        {statusDay === "morning" ? regardsDay.morning : regardsDay.night}
      </span>
    </div>
  );
};
