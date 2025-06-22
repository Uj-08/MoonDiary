import styled from "styled-components";

export const AdditionalSection = styled.section`
	flex: 0 1 300px;
	padding: 0 1rem;
	display: flex;
	flex-direction: column;
	gap: 8px;
	@media (max-width: 920px) {
		max-width: 100%;
		padding: 1rem 0;
	}
`;

export const TagsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 12px 0px;
	@media (max-width: 920px) {
		padding: 0 8px;
		flex-wrap: nowrap;
		overflow-x: scroll;
		&::-webkit-scrollbar {
			display: none;
		}
	}
`;

export const BlogTag = styled.h3`
	all: unset;
	padding: 4px 3px;
	font-family: "Arimo", sans-serif;
	font-weight: bold;
	font-style: italic;
	letter-spacing: 0.3px;
	cursor: pointer;
	opacity: 0.6;
	transition: opacity 200ms linear;
	&:hover {
		opacity: 0.8;
	}
`;

export const AdditionalData = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 10px 30px 40px 40px;
	margin: -10px -30px -40px -40px;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
	div {
		flex-shrink: 0;
	}
	@media (max-width: 920px) {
		flex-direction: row;
		overflow-x: scroll;
		width: 100%;
		padding: 0;
		margin: 0;
		padding: 8px;
		padding-bottom: 40px;
		margin-bottom: -40px;
	}
`;
