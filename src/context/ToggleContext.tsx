import { createContext, SetStateAction, useState, Dispatch } from "react";

type InitialProps = {
  isOn: boolean;
  setIsOn: Dispatch<SetStateAction<boolean>>;
};
export const ToggleContext = createContext<InitialProps>({
  isOn: false,
  setIsOn: () => {},
});

export const ToggleProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOn, setIsOn] = useState(false);
  return (
    <ToggleContext.Provider
      value={{
        isOn,
        setIsOn,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
};
