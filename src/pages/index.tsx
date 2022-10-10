import Link from "next/link";
import type { NextPage } from "next";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { WrapperContext } from "../components/WrapperContext";
import API from "../utilities/api";
import STORAGE from "../utilities/storage";

const HomePage: NextPage = () => {
  const { isLogined, token, setIsLogined, setToken, userName, setUserName } =
    useContext(WrapperContext);

  useEffect(() => {
    const userData = STORAGE.get("user_data");

    if (isLogined === false && userData?.user.ID && userData?.accessToken) {
      API.get(`/users/${userData?.user.ID}`).then(function (res) {
        setIsLogined(true);
        setToken(userData.accessToken);
        setUserName(res.data.data.user.NAME);
      });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user_data");
    setToken("");
    setIsLogined(false);
    setUserName("");
  };

  return (
    <>
      <Header>
        <Link href="/">
          <Title>HAUS</Title>
        </Link>
        {isLogined ? (
          <UserWrapper>
            <UserName>{userName}</UserName>
            <Link href="#" onClick={logout}>
              로그아웃
            </Link>
          </UserWrapper>
        ) : (
          <Link href="/login">login</Link>
        )}
      </Header>
      <Container>
        <Link href="/pagination?page=1">
          <StyledLink>pagination</StyledLink>
        </Link>
        <Link href="/infinite-scroll">
          <StyledLink>infinite scroll</StyledLink>
        </Link>
      </Container>
    </>
  );
};

export default HomePage;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 40px;
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  width: 240px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  font-size: 24px;

  & + & {
    margin-top: 40px;
  }
`;

const UserWrapper = styled.div``;
const UserName = styled.div``;
