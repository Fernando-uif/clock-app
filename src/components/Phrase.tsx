import { useState } from "react";

import { phrases } from "../data/phrases/phrases";

import Icon from "./Icon";
import style from "../styles/icon/icon.module.css";

import type { PhrasesProps } from "../interfaces/Phrases.interface";

export const Phrase = () => {
  const [phrase, setPhrase] = useState<PhrasesProps>({
    phrase:
      "“The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.”",
    author: "Ada Lovelace",
  });
  const [isLoadingPhrase, setIsLoadingPhrase] = useState(false);

  const handleRandomNumber = (): void => {
    if (isLoadingPhrase) return;
    const number = Math.floor(Math.random() * phrases.length);
    setIsLoadingPhrase(true);
    setPhrase(phrases[number]);
    setTimeout(() => {
      setIsLoadingPhrase(false);
    }, 100);
  };

  return (
    <>
      <div
        className={`w-72 m-auto pt-8 pl-6 pr-13 text-white z-20 mb-10 relative `}
      >
        <blockquote className={`text-xs font-normal leading-5 text-light`}>
          {phrase?.phrase || ""}
        </blockquote>
        <cite className={`text-xs font-bold leading-5 text-light`}>
          {phrase?.author || ""}
        </cite>
        <Icon
          name="refresh"
          className={`${
            style["refreshIcon"]
          } absolute -right-5 cursor-pointer bottom-14 top-[34px] block h-[18px] transform transition-transform ${
            isLoadingPhrase ? " duration-100 rotate-90" : ""
          }`}
          onClick={() => handleRandomNumber()}
        />
      </div>
    </>
  );
};
