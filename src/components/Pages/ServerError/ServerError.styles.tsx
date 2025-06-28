import styled, { keyframes } from "styled-components";
import { anton } from "@/styles/fonts";

const twinkle = keyframes`
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
`;

export const Container = styled.div`
	padding-top: 60px;
	min-height: calc(100dvh - 200px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	gap: 3rem;
`;

export const FlexRow = styled.div`
	display: flex;
	align-items: center;
	gap: 4rem;
	margin: -50px 0;

	@media (max-width: 640px) {
		flex-direction: column;
		gap: 1.5rem;
	}
`;

export const Illustration = styled.div`
	max-width: 11.25rem; // ~180px
	margin: 0 -54px;

	svg {
		width: 100%;
		height: auto;
	}

	.twinkle {
		animation: ${twinkle} 1.5s infinite ease-in-out;
		transform-origin: center;
		will-change: opacity;
	}
`;

export const TextBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	text-align: left;

	@media (max-width: 640px) {
		align-items: center;
		text-align: center;
	}
`;

export const Title = styled.h1`
	font-size: 6rem;
	font-family: ${anton.style.fontFamily}, sans-serif;
	color: #232323;
	margin: 0;
`;

export const Subtitle = styled.h2`
	font-size: 2rem;
	font-weight: 400;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	color: #454545;
`;

export const StyledButton = styled.button`
	cursor: pointer;
	padding: 1rem 2rem;
	border-radius: 10px;
	background-color: #232323;
	color: white;
	font-weight: 500;
	text-decoration: none;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-size: 1.2rem;

	will-change: transform, box-shadow;
	transition: transform 300ms ease;

	&:hover {
		transform: scale(1.02);
	}
	&:active {
		transform: scale(0.97);
	}
`;
