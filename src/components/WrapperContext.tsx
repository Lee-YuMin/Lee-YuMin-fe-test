import React, { createContext, ReactNode, useState } from "react";

interface WrapperContextProps {
  isLogined: boolean;
  token: string;
  children: ReactNode;
}

export const WrapperContext = createContext({
  isLogined: false,
  setIsLogined: (isLogined: boolean) => {},
  token: "",
  setToken: (token: string) => {},
  userName: "",
  setUserName: (userName: string) => {},
});

const Wrapper = (props: WrapperContextProps) => {
  const [isLogined, setIsLogined] = useState<boolean>(props.isLogined);
  const [token, setToken] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  return (
    <WrapperContext.Provider
      value={{
        isLogined,
        setIsLogined,
        token,
        setToken,
        userName,
        setUserName,
      }}
    >
      {props.children}
    </WrapperContext.Provider>
  );
};

export default Wrapper;
