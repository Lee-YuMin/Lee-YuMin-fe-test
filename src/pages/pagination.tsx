import { useRouter } from "next/router";
import Link from "next/link";
import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import { WrapperContext } from "../components/WrapperContext";
import API from "../utilities/api";
import usePagination from "../components/usePagination";

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;
  const [productList, setProductList] = useState([]);
  const [isError, setIsError] = useState(false);
  const { userInfo, setUserInfo } = useContext(WrapperContext);
  const { setCurrentPage, totalPages, setTotalCount } = usePagination(
    "pagination",
    10,
    0
  );

  useEffect(() => {
    if (!page) return;
    API.get(`/products?page=${page}&size=10`)
      .then((res) => {
        setProductList(res?.data?.data?.products);
        setTotalCount(res?.data?.data?.totalCount);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [page]);

  return (
    <>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <Container>
        {!isError ? (
          <>
            <ProductList products={productList} />
            <Pagination
              totalPage={totalPages}
              currentPage={Number(page)}
              setCurrentPage={setCurrentPage}
              pagingCount={5}
            />
          </>
        ) : (
          "존재하지 않는 페이지입니다."
        )}
      </Container>
    </>
  );
};

export default PaginationPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
