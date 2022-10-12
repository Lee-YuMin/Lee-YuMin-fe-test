import { useContext, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import styled from "styled-components";

import setupMSW from "../api/setup";
import GlobalStyle from "../styles/GlobalStyle";
import WrapperContext from "../components/WrapperContext";

setupMSW();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Background />
      <WrapperContext isLogined={false} token="">
        <Content>
          <Component {...pageProps} />
        </Content>
      </WrapperContext>
    </>
  );
}

export default MyApp;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
