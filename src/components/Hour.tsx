interface HourProps {
  time: string[];
  completeTime: Date;
}
export const Hour = ({ time, completeTime }: HourProps) => {
  return (
    <time
      className="text-light text-[6.25rem] font-bold leading-[6.25rem] tracking-[-.15624rem] select-none md:text-[10.93rem] md:leading-[10.93rem]"
      dateTime={completeTime.toString()}
    >
      {time[0]}:{time[1]}
    </time>
  );
};
