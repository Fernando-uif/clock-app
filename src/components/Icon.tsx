import { iconList } from "../data/Icons/icons";

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const icon = iconList[name];
  return (
    <span dangerouslySetInnerHTML={{ __html: icon }} className={className} />
  );
};

export default Icon;
