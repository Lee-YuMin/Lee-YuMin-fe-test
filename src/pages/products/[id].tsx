import Link from "next/link";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { WrapperContext } from "../../components/WrapperContext";
import API from "../../utilities/api";
import { Product } from "../../types/product";
import { NUMBER } from "../../utilities/util";

const ProductDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { userInfo, setUserInfo } = useContext(WrapperContext);
  const [productDetail, setProductDetail] = useState<Product>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProductDetail(res?.data?.data?.product);
        setIsError(false);
      } catch (e) {
        setIsError(true);
      }
    })();
  }, []);

  return (
    <>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      {isError ? (
        "존재하지 않는 페이지입니다."
      ) : productDetail ? (
        <>
          <Thumbnail
            src={
              productDetail.thumbnail
                ? productDetail.thumbnail
                : "/defaultThumbnail.jpg"
            }
          />
          <ProductInfoWrapper>
            <Name>{productDetail.name}</Name>
            <Price>{NUMBER.COMMA(productDetail.price)}원</Price>
          </ProductInfoWrapper>
        </>
      ) : null}
    </>
  );
};

export default ProductDetailPage;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;
