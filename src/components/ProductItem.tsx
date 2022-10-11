import styled from "styled-components";
import Link from "next/link";

import { Product } from "../types/product";
import { NUMBER } from "../utilities/util";

type ProductItemProps = {
  product: Product;
  id: number;
};

const ProductItem = ({
  product: { name, thumbnail, price },
  id,
}: ProductItemProps) => (
  <Link href={`/products/${id}`}>
    <Container>
      <Thumbnail src={thumbnail ? thumbnail : "/defaultThumbnail.jpg"} />
      <Name>{name}</Name>
      <Price>{NUMBER.COMMA(price)}</Price>
    </Container>
  </Link>
);

export default ProductItem;

const Container = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
`;

const Name = styled.article`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.article`
  margin-top: 4px;
`;
