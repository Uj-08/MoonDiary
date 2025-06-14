import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Container,
  Grid,
  SortContainer,
  Label,
  Select,
} from "./ArticleGrid.styles";
import DynamicCard from "../ArticleCard/ArticleCard.component";
import { PopulatedBlogType } from "@/types/blog";
import { ClientContext } from "@/containers/Base/Base";
import { getCookie } from "cookies-next";
import { COOKIE_NAME } from "@/helpers/constants";
import { useDispatch } from "react-redux";
import { updateBlogDataIsLoading } from "@/redux/slices/blogInfo";

const ArticleGrid = ({ blogsArray, apiPath }: { blogsArray: PopulatedBlogType[], apiPath: string }) => {
  const router = useRouter();
  const client = useContext(ClientContext);
  const dispatch = useDispatch();

  const { sort = "updatedAt", order = "-1" } = router.query;
  const [sortState, setSortState] = useState(sort);
  const [orderState, setOrderState] = useState(order);

  const handleSortChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSortState(newSort);
    const updatedBlogs = await getBlogs({
      sort: newSort,
      order: orderState as string,
    });
    setBlogsArrayState(updatedBlogs);
    router.replace(
      { pathname: router.pathname, query: { ...router.query, sort: newSort } },
      undefined,
      { shallow: true }
    );
  };

  const handleOrderChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = e.target.value;
    setOrderState(newOrder);
    const updatedBlogs = await getBlogs({
      sort: sortState as string,
      order: newOrder,
    });
    setBlogsArrayState(updatedBlogs);
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, order: newOrder },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const getBlogs = async ({ sort, order }: { sort: string; order: string }) => {
    try {
      dispatch(updateBlogDataIsLoading(true))
      const res = await fetch(`/api/${apiPath}?sort=${sort}&order=${order}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-session-token": getCookie(COOKIE_NAME) as string,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      return data;
    } catch (err: any) {
      console.log(err.message || "Something went wrong while fetching blogs.");
      return [];
    } finally {
      dispatch(updateBlogDataIsLoading(false));
    }
  };

  const [blogsArrayState, setBlogsArrayState] = useState(blogsArray);

  return (
    <Container>
      <Grid>
        <SortContainer>
          <span>
            <Label htmlFor="sort">Sort By:</Label>
            <Select
              id="sort"
              name="sort"
              value={sortState}
              onChange={handleSortChange}
            >
              <option value="createdAt">Date Created</option>
              <option value="updatedAt">Last Updated</option>
              <option value="blogTitle">Title</option>
            </Select>
          </span>

          <span>
            <Label htmlFor="order">Order:</Label>
            <Select
              id="order"
              name="order"
              value={orderState}
              onChange={handleOrderChange}
            >
              <option value="1">Ascending</option>
              <option value="-1">Descending</option>
            </Select>
          </span>
        </SortContainer>
        {blogsArrayState?.map((blog, idx: number) => {
          return (
            <DynamicCard
              key={blog._id.toString()}
              index={idx}
              blog={blog}
              clientEmail={client?.email}
            />
          );
        })}
      </Grid>
    </Container>
  );
};

export default React.memo(ArticleGrid);
