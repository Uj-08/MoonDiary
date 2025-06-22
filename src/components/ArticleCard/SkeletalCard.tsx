import React from "react";
import {
	AuthorDetail,
	AuthorProfile,
	BlogAuthor,
	BlogAuthorContainer,
	BlogHeader,
	BlogTitle,
	CardDetails,
	Container,
	MainContent,
	TagsContainer,
} from "./ArticleCard.styles";
import { Shimmer } from "../ImageComponent/ShimmerImage.styles";
import styled from "styled-components";

const ImageContainer = styled.div`
	aspect-ratio: 4/3;
	position: relative;
`;

const Line = styled.div<{ width: string; height: string }>`
	${({ width }) => `width: ${width};`}
	${({ height }) => `height: ${height};`}
    border-radius: 8px;
	position: relative;
	overflow: hidden;
`;

const SkeletalCard = () => {
	return (
		<Container $isDraft={false}>
			<ImageContainer>
				<Shimmer $isLoading={true} />
			</ImageContainer>
			<CardDetails>
				<MainContent>
					<BlogHeader>
						<TagsContainer>
							<Line width="50px" height="20px">
								<Shimmer $isLoading={true} />
							</Line>
							<Line width="50px" height="20px">
								<Shimmer $isLoading={true} />
							</Line>
							<Line width="50px" height="20px">
								<Shimmer $isLoading={true} />
							</Line>
						</TagsContainer>
					</BlogHeader>
					<BlogTitle>
						<Line width="60%" height="20px">
							<Shimmer $isLoading={true} />
						</Line>
					</BlogTitle>
					<Line width="100%" height="12px">
						{/* <Shimmer isLoading={true} /> */}
					</Line>
					<Line width="100%" height="12px">
						<Shimmer $isLoading={true} />
					</Line>
					<Line width="100%" height="12px">
						<Shimmer $isLoading={true} />
					</Line>
					<Line width="100%" height="12px">
						<Shimmer $isLoading={true} />
					</Line>
					<Line width="100%" height="12px">
						<Shimmer $isLoading={true} />
					</Line>
					<Line width="80%" height="12px">
						<Shimmer $isLoading={true} />
					</Line>
				</MainContent>
				<BlogAuthorContainer>
					<BlogAuthor>
						<AuthorProfile>
							<Shimmer $isLoading={true} />
						</AuthorProfile>
						<AuthorDetail>
							<div>
								<Line width="40%" height="12px">
									<Shimmer $isLoading={true} />
								</Line>
							</div>
							<Line width="40%" height="2px" />
							<div>
								<Line width="30%" height="12px">
									<Shimmer $isLoading={true} />
								</Line>
							</div>
						</AuthorDetail>
					</BlogAuthor>
				</BlogAuthorContainer>
			</CardDetails>
		</Container>
	);
};

export default SkeletalCard;
