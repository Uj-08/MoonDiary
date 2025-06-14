import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateBlogDataIsLoading } from "@/redux/slices/blogInfo";

// Constants
const DEFAULT_SORT = "updatedAt";
const DEFAULT_ORDER = "-1";

// Fetcher
const fetchBlogs = async ({
  apiPath,
  sort,
  order,
  token,
}: {
  apiPath: string;
  sort: string;
  order: string;
  token: string;
}) => {
  const res = await fetch(`/api/${apiPath}?sort=${sort}&order=${order}`, {
    headers: {
      "Content-Type": "application/json",
      "x-session-token": token,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

const ArticleGrid = ({
  blogsArray,
  apiPath,
}: {
  blogsArray: PopulatedBlogType[];
  apiPath: string;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const client = useContext(ClientContext);
  const token = getCookie(COOKIE_NAME) as string;

  // State for sorting and ordering
  const [sortState, setSortState] = useState(DEFAULT_SORT);
  const [orderState, setOrderState] = useState(DEFAULT_ORDER);

  // Sync state with router.query when router is ready
  useEffect(() => {
    if (!router.isReady) return;

    const sortQuery = (router.query.sort as string) || DEFAULT_SORT;
    const orderQuery = (router.query.order as string) || DEFAULT_ORDER;

    setSortState(sortQuery);
    setOrderState(orderQuery);
  }, [router.isReady, router.query.sort, router.query.order]);

  // Fetch blogs
  const { data: blogs, isLoading, isFetching } = useQuery<PopulatedBlogType[], Error>({
    queryKey: ["blogs", apiPath, sortState, orderState],
    queryFn: () =>
      fetchBlogs({
        apiPath,
        sort: sortState,
        order: orderState,
        token,
      }),
    initialData: blogsArray,
    placeholderData: (prev) => prev,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    enabled: router.isReady,
  });

  // Update global loading state
useEffect(() => {
  dispatch(updateBlogDataIsLoading(isLoading || isFetching));
}, [isLoading, isFetching, dispatch]);

  // Update URL params without full reload
  const updateQuery = (param: "sort" | "order", value: string) => {
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, [param]: value },
      },
      undefined,
      { shallow: true }
    );
  };

  // Sort/order handlers
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSortState(newSort);
    updateQuery("sort", newSort);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = e.target.value;
    setOrderState(newOrder);
    updateQuery("order", newOrder);
  };

  return (
    <Container>
      <Grid>
        <SortContainer>
          <span>
            <Label htmlFor="sort">Sort By:</Label>
            <Select id="sort" value={sortState} onChange={handleSortChange}>
              <option value="createdAt">Date Created</option>
              <option value="updatedAt">Last Updated</option>
              <option value="blogTitle">Title</option>
            </Select>
          </span>

          <span>
            <Label htmlFor="order">Order:</Label>
            <Select id="order" value={orderState} onChange={handleOrderChange}>
              <option value="1">Ascending</option>
              <option value="-1">Descending</option>
            </Select>
          </span>
        </SortContainer>

        {blogs?.map((blog, idx) => (
          <DynamicCard
            key={blog._id.toString()}
            index={idx}
            blog={blog}
            clientEmail={client?.email}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default React.memo(ArticleGrid);