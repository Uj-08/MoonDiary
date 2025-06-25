import React, { useContext, useEffect, useState } from "react";
import { Container, Grid, SortContainer, Select } from "./ArticleGrid.styles";
import DynamicCard from "../ArticleCard/ArticleCard.component";
import { BaseContext, BaseContextType } from "@/containers/Base/Base";
import { getCookie } from "cookies-next";
import { COOKIE_NAME } from "@/helpers/constants";
import { useDispatch } from "react-redux";
import { updateBlogDataIsLoading } from "@/redux/slices/blogInfo";
import { ArticleGridTypes } from "./ArticleGrid.types";

const ArticleGrid = ({ blogsArray, API_INSTANCE }: ArticleGridTypes) => {
	const dispatch = useDispatch();
	const context = useContext<BaseContextType | null>(BaseContext);
	const token = getCookie(COOKIE_NAME) as string;

	const [sortState, setSortState] = useState<string | undefined>();
	const [orderState, setOrderState] = useState<string | undefined>();

	const [blogsArrayState, setBlogsArrayState] = useState(blogsArray);

	useEffect(() => {
		setBlogsArrayState(blogsArray);
	}, [blogsArray]);

	// Sort/order handlers
	const handleSortChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newSort = e.target.value;
		setSortState(newSort);
		const blogsData = await fetchBlogs({
			order: orderState ?? "",
			sort: newSort,
		});
		setBlogsArrayState(blogsData);
	};

	const handleOrderChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newOrder = e.target.value;
		setOrderState(newOrder);
		const blogsData = await fetchBlogs({
			order: newOrder,
			sort: sortState ?? "",
		});
		setBlogsArrayState(blogsData);
	};

	// Fetcher
	const fetchBlogs = async ({ sort, order }: { sort: string; order: string }) => {
		try {
			dispatch(updateBlogDataIsLoading(true));
			(API_INSTANCE as URL).searchParams.set("sort", sort);
			(API_INSTANCE as URL).searchParams.set("order", order);
			const res = await fetch((API_INSTANCE as URL).href, {
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
			console.log(err.message ?? "An unknown error occurred.");
			return [];
		} finally {
			dispatch(updateBlogDataIsLoading(false));
		}
	};

	return (
		<Container>
			<Grid>
				{blogsArray.length !== 0 && (
					<SortContainer $show={blogsArray.length > 3}>
						<span>
							<Select id="sort" value={sortState} onChange={handleSortChange} defaultValue="">
								<option disabled value="">
									Sort By…
								</option>
								<option value="createdAt">First Published</option>
								<option value="updatedAt">Last Change</option>
								<option value="blogTitle">Title (A–Z)</option>
							</Select>
						</span>

						<span>
							<Select id="order" value={orderState} onChange={handleOrderChange} defaultValue="">
								<option disabled value="">
									Order By…
								</option>
								<option value="1">{sortState === "blogTitle" ? "(A-Z)" : "Oldest First"}</option>
								<option value="-1">{sortState === "blogTitle" ? "(Z-A)" : "Newest First"}</option>
							</Select>
						</span>
					</SortContainer>
				)}

				{blogsArrayState?.map((blog, idx) => (
					<DynamicCard
						key={blog._id.toString()}
						index={idx}
						blog={blog}
						clientEmail={context?.client?.email}
					/>
				))}
			</Grid>
		</Container>
	);
};

export default React.memo(ArticleGrid);
