import styled from "styled-components";

export const Container = styled.section`
	padding: 0rem 8rem;
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

export const Title = styled.h2`
	font-size: 25px;
	font-family: "Arimo", sans-serif;
	font-weight: 900;
	text-transform: uppercase;
`;

export const Grid = styled.div`
	display: grid;
	padding-top: 1rem;

	& > :first-child {
		grid-column: 1 / -1;
	}

	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 1rem;
`;

export const SortContainer = styled.div<{ $show?: boolean }>`
	display: ${({ $show }) => ($show ? "flex" : "none")};
	gap: 12px;
	align-items: center;
	flex-wrap: wrap;
	font-family: "Arimo", sans-serif;
	span {
		display: flex;
		gap: 10px;
		align-items: center;
	}
	@media (max-width: 500px) {
		font-size: 12px;
	}
`;

export const Label = styled.label`
	font-weight: 500;
	color: #000;
`;

export const Select = styled.select`
	padding: 6px 12px;
	border-radius: 8px;
	border: 1px solid #fff;
	background-color: #fff;
	font-size: 14px;
	color: #303030;
	appearance: none;
	cursor: pointer;

	transition: filter 200ms ease;
	will-change: filter;

	min-width: 104px;

	@media (max-width: 500px) {
		font-size: 12px;
		min-width: 93px;
	}

	&:hover {
		filter: drop-shadow(0 4px 10px rgba(189, 16, 224, 0.14));
	}

	&:focus {
		filter: drop-shadow(0 4px 12px rgba(189, 16, 224, 0.22));
		outline: none;
	}
`;
