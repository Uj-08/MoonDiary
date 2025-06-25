import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 24px;
	min-height: calc(100dvh - 220px);

	padding: 140px 8rem 40px 8rem;
	@media (max-width: 1200px) {
		padding: 100px 4rem 40px 4rem;
	}
	@media (max-width: 812px) {
		padding: 100px 2rem 40px 2rem;
	}
	@media (max-width: 450px) {
		padding: 100px 1rem 40px 1rem;
	}
`;

export const Title = styled.h1`
	color: #383838;
	/* padding: 0 1rem; */
	align-self: flex-start;
	font-family: "Arimo", sans-serif;
	@media (max-width: 640px) {
		align-self: center;
		padding: 0;
	}
`;

export const FlexWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	gap: 0.75rem;
	width: 100%;
	/* padding: 0 1rem; */
	@media (max-width: 640px) {
		justify-content: center;
		padding: 0;
	}
`;
