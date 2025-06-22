import styled from "styled-components";
import { anton } from "@/styles/fonts";

export const Container = styled.div`
	min-height: calc(100dvh);
	padding-top: 120px;
`;

export const FeatureHeader = styled.h2`
	font-family: ${anton.style.fontFamily}, sans-serif;
	letter-spacing: 0.8px;
	padding: 1rem 8rem;
	@media (max-width: 1200px) {
		padding: 0 4rem;
	}
	@media (max-width: 812px) {
		padding: 0 2rem;
	}
	@media (max-width: 450px) {
		padding: 0 1rem;
	}
	padding-bottom: 0;
`;
