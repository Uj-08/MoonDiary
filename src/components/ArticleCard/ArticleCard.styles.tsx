import styled from "styled-components";
import { ReadTimeBadge } from "../Blog/Blog.styles";

export const Container = styled.div<{ $isDraft: boolean; $noShadow?: boolean }>`
	width: 100%;
	min-width: 300px;
	aspect-ratio: 2 / 3;
	border-radius: 8px;
	overflow: hidden;
	cursor: pointer;
	justify-self: center;

	display: flex;
	flex-direction: column;

	background: white;
	filter: ${({ $isDraft, $noShadow }) =>
		$noShadow
			? "none"
			: `grayscale(${$isDraft ? "1" : "0"}) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))`};

	transition:
		transform 200ms ease,
		filter 200ms ease;
	will-change: transform, filter;

	&:hover {
		filter: ${({ $noShadow }) =>
			$noShadow ? "none" : "grayscale(0) drop-shadow(0 12px 28px rgba(177, 1, 177, 0.25))"};
	}

	&:active {
		transform: scale(0.98);
	}
`;

export const ImageContainer = styled.div`
	overflow: hidden;
	position: relative;
	img {
		width: 100%;
		object-fit: cover;
		object-position: center;
		transition: transform 200ms linear;
		&:hover {
			transform: scale(1.02);
		}
	}
`;

export const CardReadTimeBadge = styled(ReadTimeBadge)`
	padding: 3px 6px;
	font-size: 0.6em;
`;

export const ButtonsContainer = styled.div`
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	display: flex;
	margin-left: auto;
	font-size: 13px;
	gap: 8px;
	padding-right: 8px;
`;

export const EditButton = styled.button`
	all: unset;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	border: 1px solid #009fbd;
	padding: 5px 8px;
	background-color: #fff;
	color: #009fbd;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	cursor: pointer;

	transition:
		transform 200ms ease,
		filter 200ms ease;
	will-change: transform, filter;

	&:hover {
		transform: scale(1.02);
	}

	&:active {
		transform: scale(0.97);
	}
`;

export const DeleteButton = styled(EditButton)`
	border-color: #f31559;
	color: #f31559;
`;

export const CardDetails = styled.div`
	flex: 1;
	padding: 5px 10px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	gap: 6px;
`;

export const MainContent = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 6px;
	/* overflow: hidden; */
`;

export const BlogHeader = styled.div`
	height: 25px;
	/* background-color: red; */
`;

export const TagsContainer = styled.div`
	display: flex;
	padding: 4px 0 0 0;
	gap: 4px;
`;

export const Tag = styled.h3<{
	$bgColor: string;
	$maxWidth: string;
	$fontSize: string;
	$letterSpacing: string;
}>`
	all: unset;
	cursor: pointer;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	padding: 2px 8px;
	background-color: ${({ $bgColor }) => $bgColor};
	display: flex;
	align-items: center;
	border-radius: 8px;
	color: white;
	${({ $fontSize, $letterSpacing }) =>
		`font-size: ${$fontSize}; letter-spacing: ${$letterSpacing};`}
	opacity: 0.8;
	transition: opacity 200ms linear;
	&:hover {
		opacity: 1;
	}
	span {
		${({ $maxWidth }) => `max-width: ${$maxWidth};`}
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

export const MoreTag = styled.div<{ color: string }>`
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	padding: 2px 8px;
	display: flex;
	align-items: center;
	border-radius: 8px;
	font-size: 12px;
	letter-spacing: 0.5px;
	color: ${({ color }) => color};
	border: ${({ color }) => `1px solid ${color}`};
	background-color: #fff;
	span {
		max-width: 90px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

export const BlogTitle = styled.h2`
	font-family: "Arimo", sans-serif;
	text-align: left;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	flex-shrink: 0;
	@media (max-width: 1200px) {
		font-size: 1.3rem;
	}
`;

export const BlogData = styled.p`
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	/* text-align: left; */
	display: -webkit-box;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;
	overflow: hidden;
`;

export const BlogAuthorContainer = styled.div`
	display: flex;
	flex-shrink: 0;
	padding: 15px 0;
`;

export const BlogAuthor = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	flex: 1;
`;

export const AuthorProfile = styled.div`
	position: relative;
	height: 30px;
	width: 30px;
	border-radius: 100%;
	overflow: hidden;
	text-align: left;
	img {
		width: 100%;
		object-fit: cover;
	}
`;

export const AuthorDetail = styled.div`
	display: flex;
	flex-direction: column;
	font-family: "Arimo", sans-serif;
	gap: 1px;
	flex: 1;
	div {
		&:first-child {
			font-weight: 700;
			font-size: 13px;
		}
		&:last-child {
			font-weight: 200;
			font-size: 10px;
			color: #9a9a9a;
		}
	}
`;
