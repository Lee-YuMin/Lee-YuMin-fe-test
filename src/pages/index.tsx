import Link from "next/link";
import type { NextPage } from "next";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { WrapperContext } from "../components/WrapperContext";
import Header from "../components/Header";
import API from "../utilities/api";
import STORAGE from "../utilities/storage";

const HomePage: NextPage = () => {
  const { userInfo, setUserInfo } = useContext(WrapperContext);

  useEffect(() => {
    const userInfo = STORAGE.get("user_data");

    if (
      userInfo?.isLogined === false &&
      userInfo?.user.ID &&
      userInfo?.accessToken
    ) {
      API.get(`/users/${userInfo?.user.ID}`).then(function (res) {
        setUserInfo({
          isLogined: true,
          token: userInfo.accessToken,
          userName: res.data.data.user.NAME,
        });
      });
    }
  }, []);

  return (
    <>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
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
