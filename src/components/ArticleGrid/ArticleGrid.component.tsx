import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Title, Grid, FilterContainer, SortContainer, Label, Select } from "./ArticleGrid.styles";
import DynamicCard from "../ArticleCard/DynamicCard.component";
import { getCookie, hasCookie } from "cookies-next";
import jwtDecode from "jwt-decode";

const ArticleGrid = ({ blogs }: { blogs: any }) => {
  const router = useRouter();
  const [client, setClient] = useState<{ email: string }>();

  useEffect(() => {
    if (hasCookie("clientMD")) {
      const cookie = getCookie("clientMD");
      if (typeof cookie === "string") {
        setClient(jwtDecode(cookie));
      }
    }
  }, []);


  const { sort = "updatedAt", order = "-1" } = router.query;

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sort: e.target.value },
    });
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, order: e.target.value },
    });
  };

  return (
    <Container>
      <SortContainer>
      <Label htmlFor="sort">Sort By:</Label>
      <Select id="sort" name="sort" value={sort} onChange={handleSortChange}>
        <option value="createdAt">Date Created</option>
        <option value="updatedAt">Last Updated</option>
        <option value="blogTitle">Title</option>
      </Select>

      <Label htmlFor="order">Order:</Label>
      <Select id="order" name="order" value={order} onChange={handleOrderChange}>
        <option value="1">Ascending</option>
        <option value="-1">Descending</option>
      </Select>
    </SortContainer>
      <Grid>
        {blogs?.map((blog: any, idx: number) => {
          return (
            <DynamicCard key={idx} index={idx} blog={blog} clientEmail={client?.email} />
          );
        })}
      </Grid>
    </Container>
  );
}

export default React.memo(ArticleGrid);
