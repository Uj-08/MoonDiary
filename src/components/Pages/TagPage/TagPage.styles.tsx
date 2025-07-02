import styled from "styled-components";
import { Title } from "../Features/Features.styles";

export const TagTitle = styled(Title)`
	padding: 140px 8rem 0px 8rem;
	@media (max-width: 1200px) {
		padding: 100px 4rem 0px 4rem;
	}
	@media (max-width: 812px) {
		padding: 100px 2rem 0px 2rem;
	}
	@media (max-width: 450px) {
		padding: 100px 1rem 0px 1rem;
	}
`;

export const Container = styled.div`
	min-height: calc(100dvh);
`;
