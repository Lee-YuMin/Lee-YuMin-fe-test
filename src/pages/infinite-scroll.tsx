import Link from "next/link";
import type { NextPage } from "next";
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { WrapperContext } from "../components/WrapperContext";
import API from "../utilities/api";

import ProductList from "../components/ProductList";
import { Product } from "../types/product";
import { throttle } from "lodash";

const InfiniteScrollPage: NextPage = () => {
  const { userInfo, setUserInfo } = useContext(WrapperContext);
  const [productList, setProductList] = useState<Product[]>([]);
  const [isFetching, setFetching] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);
  const currentPage = useRef(0);
  const totalPage = useRef(0);
  const rootRef = useRef(null);

  const getProductList = useCallback(async (page: number) => {
    if (!page) return;
    const res = await API.get(`/products?page=${page}&size=10`);
    totalPage.current = Math.ceil(res?.data?.data?.totalCount / 10);

    return res?.data?.data?.products || [];
  }, []);

  // 데이터 요청 함수 + 쓰로틀링 2초
  const loadProductList = useCallback(
    throttle(async () => {
      currentPage.current++;
      const data = await getProductList(currentPage.current);

      setProductList([...productList, ...data]);
      setFetching(false);
      setHasNextPage(currentPage.current < totalPage.current);
    }, 2000),
    [productList, getProductList]
  );

  // 스크롤 이벤트 init + 초기 데이터 로딩
  useEffect(() => {
    const handleScroll = () => {
      const height: number = rootRef?.current?.offsetHeight;
      if (window.scrollY + window.innerHeight + 10 >= height) {
        setFetching(true);
      }
    };
    loadProductList();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && hasNextPage) loadProductList();
    else if (!hasNextPage) setFetching(false);
  }, [isFetching]);

  return (
    <>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <Container ref={rootRef}>
        <ProductList products={productList} />
      </Container>
    </>
  );
};

export default InfiniteScrollPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
  min-height: 100%;
`;
