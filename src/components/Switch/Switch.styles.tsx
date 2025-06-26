import styled from "styled-components";

export const SwitchContainer = styled.div`
	background-color: #e0e0e0;
	border-radius: 50px;
	display: flex;
	padding: 4px;
	position: relative;
	width: fit-content;
	overflow: hidden;
`;

export const SwitchOption = styled.button<{ active: boolean }>`
	position: relative;
	z-index: 1;
	background-color: transparent;
	color: ${({ active }) => (active ? "#fff" : "#333")};
	opacity: ${({ active }) => (active ? 1 : 0.7)};
	border: none;
	padding: 0.5rem 1.5rem;
	border-radius: 50px;
	font-size: 0.9rem;
	font-weight: bold;
	cursor: pointer;
	font-family: "Arimo", sans-serif;
	transition:
		transform 300ms ease,
		opacity 300ms ease;
	will-change: transform;
	&:hover {
		opacity: 1;
	}
	&:active {
		transform: scale(0.97);
	}
`;

export const ActiveIndicator = styled.div<{ $position: number }>`
	position: absolute;
	top: 4px;
	left: 4px;
	width: calc((100% - 8px) / 3);
	height: calc(100% - 8px);
	background-color: #b101b1;
	border-radius: 50px;
	z-index: 0;
	transform: ${({ $position }) => `translateX(${100 * $position}%)`};
	transition: transform 300ms ease;
	will-change: transform;
`;
