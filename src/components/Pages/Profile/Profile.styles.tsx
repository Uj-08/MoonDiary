import styled from "styled-components";
import { TagTitle } from "../TagPage/TagPage.styles";

export const Container = styled.div`
	min-height: calc(100dvh - 220px);
`;

export const ProfileTitle = styled(TagTitle)`
	padding-top: 1rem;
`;

export const ToggleWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 2rem;
	width: 100%;
`;
