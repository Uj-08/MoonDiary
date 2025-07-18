import styled from "styled-components";
import { montserrat } from "@/styles/fonts";
import { BiBarChart } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";

export const Container = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: center;
	padding: 0rem 8rem;
	@media (max-width: 1200px) {
		padding: 0 4rem;
	}
	@media (max-width: 812px) {
		padding: 0 2rem;
	}
	@media (max-width: 450px) {
		padding: 0 1rem;
	}
	@media (max-width: 1000px) {
		flex-direction: column;
		padding: 0;
		max-width: 100%;
		border-radius: 0px;
		box-shadow: none;
	}
`;

export const PreviewContainer = styled.main`
	/* max-width: 60%; */
	flex: 1 1 auto;
	font-family: ${montserrat.style.fontFamily};
	background-color: #fff;
	overflow: hidden;
	border-radius: 8px;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	@media (max-width: 1000px) {
		max-width: 100%;
		border-radius: 0px;
		box-shadow: none;
	}
	/* @media (max-width: 812px) {
        
    }
    @media (max-width: 450px) {
    } */
`;

export const Preview = styled.div`
	width: 100%;
	height: 100%;
	/* border: 2px solid #eee; */
	@media (max-width: 1000px) {
	}
`;

export const PreviewImageContainer = styled.div`
	position: relative;
	img {
		object-fit: cover;
		aspect-ratio: 4/3;
	}
	input {
		position: absolute;
		top: 70%;
		left: 50%;
		transform: translateX(-25%);
	}
`;

export const OverlayContainer = styled.div`
	position: absolute;
	left: 0;
	bottom: 0;
	color: #fff;
	z-index: 1;
	display: flex;
	gap: 8px;
	padding: 1rem;
	font-family: ${montserrat.style.fontFamily};
`;

export const OverlayRightContainer = styled(OverlayContainer)`
	right: 0;
	left: unset;
`;

export const ShimmerContainer = styled.div`
	width: 76px;
	height: 17px;
	position: relative;
	border-radius: 4px;
	overflow: hidden;
`;

export const ButtonContainer = styled(OverlayContainer)`
	bottom: 0rem;
	left: 0rem;
	right: initial;
`;

export const PostButton = styled.button`
	font-size: 0.8em;
	padding: 6px 12px;
	color: #e1e1e1;
	border: 1px solid rgba(255, 255, 255, 0.2);
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 8px;
	text-transform: uppercase;
	cursor: pointer;
	font-weight: bold;
	&:hover {
		color: #ffffff;
		background: rgba(255, 255, 255, 0.3);
	}
`;

export const MetaBadge = styled.span`
	font-size: 0.8em;
	padding: 6px 12px;
	font-weight: 600;
	color: #e6e6e6;
	text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
	white-space: nowrap;
	font-weight: bold;
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(3px);
	border-radius: 4px;
	&:hover {
		color: #ffffff;
		background: rgba(255, 255, 255, 0.3);
	}

	display: flex;
	align-items: center;
	gap: 6px;
`;

export const MetaDivision = styled.span`
	display: flex;
	align-items: center;
	gap: 3px;
`;

export const LikeDivision = styled(MetaDivision)`
	font-weight: bold;
	font-size: 14px;
	cursor: pointer;
`;

export const CardLikeDivision = styled(MetaDivision)`
	font-weight: bold;
	font-size: 11px;
	cursor: pointer;
`;

export const ViewsIcon = styled(BiBarChart)`
	width: 18px;
	height: 18px;
`;

export const CardViewsIcon = styled(BiBarChart)`
	width: 14px;
	height: 14px;
`;

export const CommentsIcon = styled(FaRegComment)`
	width: 18px;
	height: 18px;
`;

export const CardCommentsIcon = styled(FaRegComment)`
	width: 14px;
	height: 14px;
`;
