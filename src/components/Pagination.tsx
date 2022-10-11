import React from "react";
import styled from "styled-components";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<any>>;
  pagingCount: number;
}

const Pagination = ({
  totalPage = 1,
  currentPage = 1,
  setCurrentPage,
  pagingCount = 5,
}: PaginationProps) => {
  const totalPageSet = Math.ceil(totalPage / pagingCount);
  const curPageSet = Math.ceil(currentPage / pagingCount);

  return (
    <Container>
      <Button
        onClick={() => setCurrentPage((curPageSet - 1) * pagingCount)}
        disabled={curPageSet === 1}
      >
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {Array(pagingCount)
          .fill((curPageSet - 1) * pagingCount)
          .map((page, i) => {
            const cur = page + i + 1;
            return (
              <Page
                key={cur}
                selected={cur === currentPage}
                disabled={cur === currentPage || cur > totalPage}
                onClick={() => setCurrentPage(cur)}
              >
                {cur}
              </Page>
            );
          })}
      </PageWrapper>
      <Button
        onClick={() => setCurrentPage(curPageSet * pagingCount + 1)}
        disabled={curPageSet === totalPageSet}
      >
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? "#000" : "transparent")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  font-size: 20px;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
