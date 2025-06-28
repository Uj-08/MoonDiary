import styled from "styled-components";
import { TagTitle } from "../TagPage/TagPage.styles";

export const Container = styled.div`
	min-height: calc(100dvh - 220px);
`;

export const ProfileTitle = styled(TagTitle)`
	padding-top: 1rem;
	font-size: 1.8rem;
`;

export const StickyReference = styled.div`
	margin-top: 2rem;
`;

export const ToggleWrapper = styled.div<{ $isSticky: boolean; $scrolledDown: boolean }>`
	padding: 0 4px;
	position: sticky;
	left: 0;
	right: 0;
	top: 0;
	z-index: 10;
	transform: ${({ $scrolledDown, $isSticky }) =>
		$scrolledDown ? "translateY(4px);" : $isSticky ? "translateY(64px);" : "translateY(0px); "};
	transition: transform 200ms linear;
`;
