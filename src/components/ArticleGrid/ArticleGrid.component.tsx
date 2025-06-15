import React, { useContext, useState } from "react";
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
import { useDispatch } from "react-redux";
import { updateBlogDataIsLoading } from "@/redux/slices/blogInfo";

// Constants
const DEFAULT_SORT = "updatedAt";
const DEFAULT_ORDER = "-1";

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

  // const sortQuery = (router.query.sort as string) || DEFAULT_SORT;
  // const orderQuery = (router.query.order as string) || DEFAULT_ORDER;

  const [sortState, setSortState] = useState();
  const [orderState, setOrderState] = useState();

  const [blogsArrayState, setBlogsArrayState] = useState(blogsArray);


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
  const handleSortChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSortState(newSort);
    updateQuery("sort", newSort);
    const blogsData = await fetchBlogs({
      order: orderState,
      sort: newSort
    })
    setBlogsArrayState(
      blogsData
    )
  };

  const handleOrderChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = e.target.value;
    setOrderState(newOrder);
    updateQuery("order", newOrder);
    const blogsData = await fetchBlogs({
      order: newOrder,
      sort: sortState
    })
    setBlogsArrayState(blogsData)
  };

  // Fetcher
  const fetchBlogs = async ({
    sort,
    order,
  }: {
    sort: string;
    order: string;
  }) => {
    try {
      dispatch(updateBlogDataIsLoading(true));

      const res = await fetch(`/api/${apiPath}?sort=${sort}&order=${order}`, {
        headers: {
          "Content-Type": "application/json",
          "x-session-token": token,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch blogs: ${res.statusText}`);
      }

      const data = await res.json();
      return data;
    } catch (err: any) {
      console.log(err.message || "An unknown error occurred.");
      return [];
    } finally {
      dispatch(updateBlogDataIsLoading(false));
    }
  };

  return (
    <Container>
      <Grid>
        <SortContainer>
          <span>
            {/* <Label htmlFor="sort">Sort By:</Label> */}
            <Select id="sort" value={sortState} onChange={handleSortChange}>
              <option disabled value="" selected>
                Sort By…
              </option>
              <option value="createdAt">First Published</option>
              <option value="updatedAt">Last Change</option>
              <option value="blogTitle">Title (A–Z)</option>
            </Select>
          </span>

          <span>
            {/* <Label htmlFor="order">Order:</Label> */}
            <Select id="order" value={orderState} onChange={handleOrderChange}>
              <option disabled value="" selected>
                Order By…
              </option>
              <option value="1">{sortState === "blogTitle" ? "(A-Z)" : "Oldest First"}</option>
              <option value="-1">{sortState === "blogTitle" ? "(Z-A)" : "Newest First"}</option>
            </Select>
          </span>
        </SortContainer>

        {blogsArrayState?.map((blog, idx) => (
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