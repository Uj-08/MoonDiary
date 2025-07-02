import { styled } from "styled-components";
import { montserrat } from "@/styles/fonts";

export const Container = styled.div`
	z-index: 10;
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Button = styled.button`
	all: unset;
	padding: 8px 16px;
	border-radius: 12px;
	background-color: white;
	color: black;
	font-family: ${montserrat.style.fontFamily};
	cursor: pointer;
	box-shadow:
		0 2px 2px -2px rgba(34, 47, 62, 0.1),
		0 8px 8px -4px rgba(34, 47, 62, 0.07);
`;
