import Icon from "./Icon";
import style from "../styles/icon/icon.module.css";

export const Phrase = () => {
  return (
    <>
      <div className={`w-72 m-auto pt-8 pl-6 pr-13 text-white z-20`}>
        <blockquote
          className={`text-xs font-normal leading-5  relative text-light`}
        >
          “The science of operations, as derived from mathematics more
          especially, is a science of itself, and has its own abstract truth and
          value.”
          <Icon
            name="refresh"
            className={`${style["refreshIcon"]} absolute -right-5 cursor-pointer bottom-14`}
          />
        </blockquote>
        <cite className={`text-xs font-bold leading-5 text-light`}>
          Ada Lovelace
        </cite>
      </div>
    </>
  );
};
