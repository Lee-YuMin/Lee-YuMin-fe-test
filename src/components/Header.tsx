import styled from "styled-components";
import Link from "next/link";
import { Dispatch } from "react";

interface HeaderProps {
  userInfo: {
    isLogined: boolean;
    token: string;
    userName: string;
  };
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
}

const Header = (props: HeaderProps) => {
  const { userInfo, setUserInfo } = props;

  const logout = () => {
    localStorage.removeItem("user_data");
    setUserInfo({
      isLogined: false,
      token: "",
      userName: "",
    });
  };

  return (
    <HeaderWrapper>
      <Link href="/">
        <Title>HAUS</Title>
      </Link>
      {userInfo.isLogined ? (
        <UserWrapper>
          <UserName>{userInfo.userName}</UserName>
          <Link href="#">
            <a onClick={logout}>로그아웃</a>
          </Link>
        </UserWrapper>
      ) : (
        <Link href="/login">login</Link>
      )}
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const UserWrapper = styled.div``;
const UserName = styled.div``;
