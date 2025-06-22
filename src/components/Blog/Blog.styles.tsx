import styled from "styled-components";
import { montserrat } from "@/styles/fonts";

export const Container = styled.div`
	display: flex;
	gap: 8px;
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
	@media (max-width: 920px) {
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
	@media (max-width: 920px) {
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
	@media (max-width: 920px) {
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
	right: 0rem;
	bottom: 0rem;
	color: #fff;
	z-index: 1;
	display: flex;
	gap: 8px;
	padding: 1rem;
	font-family: ${montserrat.style.fontFamily};
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

export const ReadTimeBadge = styled.span`
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
`;
