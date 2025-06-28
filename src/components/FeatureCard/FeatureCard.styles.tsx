import styled from "styled-components";
import { montserrat } from "@/styles/fonts";

export const TagChip = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 0.6rem;
	padding: 0.6rem 1rem;
	border-radius: 2rem;
	background: #fff;
	opacity: 0.65;
	border: 1px solid rgba(0, 0, 0, 0.05);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	font-family: ${montserrat.style.fontFamily}, sans-serif;
	cursor: pointer;
	transition:
		opacity 200ms ease,
		transform 200ms ease;
	color: #000;

	&:hover {
		opacity: 1;
		transform: translateY(-2px);
	}
	&:active {
		transform: scale(0.97);
		opacity: 1;
	}
`;

export const TagLabel = styled.span`
	font-size: 0.95rem;
	font-weight: bold;
`;

export const TagCount = styled.span`
	background-color: #e8e8e8;
	font-size: 0.75rem;
	padding: 0.2rem 0.6rem;
	border-radius: 1rem;
	font-weight: 500;
`;
