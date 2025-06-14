import React, { useContext, useEffect, useMemo, useState } from "react";
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

// Fetcher function
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
  const client = useContext(ClientContext);
  const token = useMemo(() => getCookie(COOKIE_NAME) as string, []);
  const dispatch = useDispatch();

  // Get query params from router
  const querySort = useMemo(
    () => (router.query.sort as string) || "updatedAt",
    [router.query.sort]
  );
  const queryOrder = useMemo(
    () => (router.query.order as string) || "-1",
    [router.query.order]
  );

  const [sortState, setSortState] = useState(querySort);
  const [orderState, setOrderState] = useState(queryOrder);

  // Stable query key
  const queryKey = useMemo(
    () => ["blogs", apiPath, querySort, queryOrder],
    [apiPath, querySort, queryOrder]
  );

  const {
    data: blogs,
    isLoading,
    // isError,
  } = useQuery<PopulatedBlogType[], Error>({
    queryKey,
    queryFn: () =>
      fetchBlogs({
        apiPath,
        sort: querySort,
        order: queryOrder,
        token,
      }),
    initialData: blogsArray,
    placeholderData: (prevData) => prevData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

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

  useEffect(() => {
    console.log({ isLoading })
    dispatch(updateBlogDataIsLoading(isLoading));
  }, [isLoading, dispatch]);

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