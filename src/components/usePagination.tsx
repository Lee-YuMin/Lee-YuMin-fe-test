import React, { useState } from "react";
import { useRouter } from "next/router";

const usePagination = (
  url: string = location.pathname,
  limit: number = 10,
  total: number = 0
) => {
  const router = useRouter();
  const [totalCount, setTotalCount] = useState(total);
  const totalPages = Math.ceil(totalCount / limit);

  const setCurrentPage = (page: number) => {
    router.push({
      pathname: `${url}`,
      query: { page: page },
    });
  };

  return {
    setCurrentPage,
    totalPages,
    setTotalCount,
  };
};
export default usePagination;
