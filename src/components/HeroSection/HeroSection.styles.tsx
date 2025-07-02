import styled from "styled-components";

export const Container = styled.header`
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	max-height: 75dvh;
	background-color: #000;
`;

export const ImageContainer = styled.div`
	position: relative;
	overflow: hidden;
	height: 100%;
	aspect-ratio: 4/3;
	max-height: 75dvh;
	z-index: 10;
	filter: blur(4px);
	width: 100%;
	z-index: 1;
	@media (max-width: 500px) {
		aspect-ratio: 1;
	}
	img {
		object-fit: cover;
		object-position: 50% 50%;
	}

	&:before {
		content: "";
		height: 100%;
		width: 100%;
		position: absolute;
		z-index: 2;
		background-color: black;
		opacity: 0.5;
	}
`;

export const HiddenTitle = styled.h1`
	z-index: 3;
	position: absolute;
	font-size: 6rem;
	color: white;
	text-align: center;
	font-size: 20px;
	visibility: hidden;
`;
