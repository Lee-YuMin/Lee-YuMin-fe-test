import React, { createContext, ReactNode, useState, useEffect } from "react";
import API from "../utilities/api";
import STORAGE from "../utilities/storage";

interface WrapperContextProps {
  isLogined: boolean;
  token: string;
  children: ReactNode;
}

interface UserInfo {
  isLogined: boolean;
  token: string;
  userName: string;
}

export const WrapperContext = createContext({
  userInfo: { isLogined: false, token: "", userName: "" },
  setUserInfo: (userInfo: UserInfo) => {},
});

const Wrapper = (props: WrapperContextProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    isLogined: false,
    token: "",
    userName: "",
  });

  useEffect(() => {
    const storedUserInfo = STORAGE.get("user_info");

    if (
      userInfo?.isLogined === false &&
      storedUserInfo?.user.ID &&
      storedUserInfo?.accessToken
    ) {
      API.get(`/users/${storedUserInfo?.user.ID}`).then(function (res) {
        setUserInfo({
          isLogined: true,
          token: storedUserInfo.accessToken,
          userName: res.data.data.user.NAME,
        });
      });
    }
  }, []);

  return (
    <WrapperContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {props.children}
    </WrapperContext.Provider>
  );
};

export default Wrapper;
