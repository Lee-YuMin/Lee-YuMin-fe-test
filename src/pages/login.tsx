import Link from "next/link";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import API from "../utilities/api";
import STORAGE from "../utilities/storage";
import Header from "../components/Header";
import { WrapperContext } from "../components/WrapperContext";

interface InputVaild {
  isValid: boolean;
  value: string;
}

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(WrapperContext);

  // 로그인 체크
  if (userInfo.isLogined === true) {
    router.push("/");
  }

  const [validId, setValidId] = useState<InputVaild>({
    isValid: true,
    value: "",
  });
  const [validPasswd, setValidPasswd] = useState<InputVaild>({
    isValid: true,
    value: "",
  });
  const [isDisableLogin, setIsDisableLogin] = useState(true);

  const checkId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkId = /^[a-zA-Z\d]{5,30}$/;
    const isValid: boolean = checkId.test(e.target.value);
    const data: InputVaild = {
      isValid,
      value: e.target.value,
    };
    setValidId(data);
    checkDisableLogin(data, validPasswd);
  };

  const checkPasswd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkPasswd = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,30}$/;
    const isValid: boolean = checkPasswd.test(e.target.value);
    const data: InputVaild = {
      isValid,
      value: e.target.value,
    };
    setValidPasswd(data);
    checkDisableLogin(validId, data);
  };

  const checkDisableLogin = (validId: InputVaild, validPasswd: InputVaild) => {
    const disabled: boolean =
      validId.isValid &&
      validPasswd.isValid &&
      validId.value != "" &&
      validPasswd.value != "";
    setIsDisableLogin(!disabled);
  };

  const clickLogin = () => {
    API.post("/login", {
      data: {
        id: validId.value,
        password: validPasswd.value,
      },
    }).then(function (res) {
      STORAGE.set("user_info", res.data.data);
      setUserInfo({
        isLogined: true,
        token: res.data.data.accessToken,
        userName: res.data.data.user.NAME,
      });
      router.push("/");
    });
  };

  return (
    <>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <Form>
        <FormElementName>아이디</FormElementName>
        <TextInput
          type="text"
          name="id"
          className={validId.isValid ? "" : "warning"}
          maxLength={30}
          onBlur={checkId}
        />
        <WarningText className={validId.isValid ? "" : "warning"}>
          올바른 아이디 형식으로 입력해주세요.
        </WarningText>
        <FormElementName>비밀번호</FormElementName>
        <TextInput
          type="password"
          name="password"
          className={validPasswd.isValid ? "" : "warning"}
          maxLength={30}
          onBlur={checkPasswd}
        />
        <WarningText className={validPasswd.isValid ? "" : "warning"}>
          올바른 비밀번호 형식으로 입력해주세요.
        </WarningText>
        <LoginButton disabled={isDisableLogin} onClick={clickLogin}>
          로그인
        </LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Form = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const FormElementName = styled.h1`
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;

  &:last-of-type {
    margin-top: 16px;
  }
`;

const TextInput = styled.input`
  margin-top: 8px;
  padding: 16px;
  background: #f7f7fa;
  border-radius: 12px;

  &.warning {
    background: #fdedee;
  }
`;

const WarningText = styled.p`
  display: none;
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;

  &.warning {
    display: block;
  }
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;
