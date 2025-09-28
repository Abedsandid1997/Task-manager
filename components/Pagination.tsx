"use client";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
interface Props {
  currentPage: number;
  totalItems: number;
  pageItems: number;
}
const Pagination = ({ currentPage, totalItems, pageItems }: Props) => {
  const totalPages = Math.ceil(totalItems / pageItems);

  const searchParams = useSearchParams();
  const router = useRouter();

  const changePage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    router.push("?" + newSearchParams);
  };

  if (totalPages === 1) return null;

  return (
    <Flex gap="2" align="center" direction="column">
      <Text>
        page {currentPage} of {totalPages}
      </Text>
      <Flex gap="2" align="center">
        <Button disabled={currentPage === 1} onClick={() => changePage(1)}>
          <DoubleArrowLeftIcon />
        </Button>
        <Button
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => changePage(currentPage + 1)}
        >
          <ArrowRightIcon />
        </Button>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => changePage(totalPages)}
        >
          <DoubleArrowRightIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Pagination;
