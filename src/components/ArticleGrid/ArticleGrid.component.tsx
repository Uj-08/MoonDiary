import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Grid, SortContainer, Label, Select } from "./ArticleGrid.styles";
import DynamicCard from "../ArticleCard/ArticleCard.component";
import { getCookie, hasCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import { COOKIE_NAME } from "@/constants";
import { PopulatedBlogType } from "@/types/blog";

const ArticleGrid = ({ blogsArray }: { blogsArray: PopulatedBlogType[] }) => {
  const router = useRouter();
  const [client, setClient] = useState<{ email: string }>();

  useEffect(() => {
    if (hasCookie(COOKIE_NAME)) {
      const cookie = getCookie(COOKIE_NAME);
      if (typeof cookie === "string") {
        setClient(jwtDecode(cookie));
      }
    }
  }, []);


  const { sort = "updatedAt", order = "-1" } = router.query;
  const [sortState, setSortState] = useState(sort)
  const [orderState, setOrderState] = useState(order)

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortState(e.target.value);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sort: e.target.value },
    });
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderState(e.target.value);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, order: e.target.value },
    });
  };

  return (
    <Container>
      <Grid>
        <SortContainer>
          <span>
            <Label htmlFor="sort">Sort By:</Label>
            <Select id="sort" name="sort" value={sortState} onChange={handleSortChange}>
              <option value="createdAt">Date Created</option>
              <option value="updatedAt">Last Updated</option>
              <option value="blogTitle">Title</option>
            </Select>
          </span>

          <span>
            <Label htmlFor="order">Order:</Label>
            <Select id="order" name="order" value={orderState} onChange={handleOrderChange}>
              <option value="1">Ascending</option>
              <option value="-1">Descending</option>
            </Select>
          </span>
        </SortContainer>
        {blogsArray?.map((blog, idx: number) => {
          return (
            <DynamicCard key={idx} index={idx} blog={blog} clientEmail={client?.email} />
          );
        })}
      </Grid>
    </Container>
  );
}

export default React.memo(ArticleGrid);
