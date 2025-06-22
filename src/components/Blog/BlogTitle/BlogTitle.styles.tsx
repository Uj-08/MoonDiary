import styled from "styled-components";
import { babylonica } from "@/styles/fonts";

export const BlogTitleContainer = styled.div`
	margin-top: 60px;
	padding: 0 8rem;
	padding-top: 10px;
	@media (max-width: 1200px) {
		padding: 0 4rem;
	}
	@media (max-width: 812px) {
		padding: 0 2rem;
	}
	@media (max-width: 450px) {
		padding: 0 1rem;
	}
`;

export const BlogTitle = styled.h1`
	font-family: ${babylonica.style.fontFamily}, cursive;
	font-size: 76px;
	text-align: center;
	margin-bottom: 10px;
	padding: 20px 0;
	width: 100%;
	font-weight: 600;
	@media (max-width: 670px) {
		font-size: 60px;
	}
	@media (max-width: 570px) {
		font-size: 55px;
		margin-bottom: 0;
	}
	@media (max-width: 470px) {
		font-size: 45px;
	}
`;
