import { montserrat } from "@/styles/fonts";
import { styled } from "styled-components";

export const Container = styled.div`
	position: relative;
`;

export const SuggestionWindow = styled.ul`
	position: absolute;
	top: calc(100% - 6px);
	left: 0;
	width: 100%;
	z-index: 20;
	margin: 0;
	padding: 5px 0;
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: 6px;
	backdrop-filter: blur(5px);
	padding: 10px 8px;
	box-shadow:
		rgb(0 0 0 / 20%) 0px 12px 28px 0px,
		rgb(0 0 0 / 10%) 0px 2px 4px 0px,
		rgb(255 255 255 / 5%) 0px 0px 0px 1px inset;
	border-radius: 10px;
`;

export const Suggestion = styled.li`
	font-family: ${montserrat.style.fontFamily};
	background-color: #fff;
	padding: 5px 10px;
	cursor: pointer;
	border-radius: 10px;

	transform: translateZ(0); /* triggers GPU */
	will-change: transform, filter;
	transition:
		transform 200ms ease,
		filter 200ms ease,
		opacity 200ms ease;

	opacity: 0.85;
	filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.05));

	&:hover {
		transform: translateY(-2px) scale(1.02);
		opacity: 1;
		filter: drop-shadow(0 8px 14px rgba(0, 0, 0, 0.12));
	}

	&:active {
		transform: scale(0.98);
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));
	}
`;
