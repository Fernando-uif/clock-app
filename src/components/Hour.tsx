interface HourProps {
  time: string[];
}
export const Hour = ({ time }: HourProps) => {
  return (
    <time
      className="text-light text-[6.25rem] font-bold leading-[6.25rem] tracking-[-.15624rem] select-none"
      dateTime=""
    >
      {time[0]}:{time[1]}
    </time>
  );
};
