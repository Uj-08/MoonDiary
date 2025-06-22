import { styled } from "styled-components";

export const ToggleContainer = styled.label`
	position: relative;
	display: inline-block;
	width: 50px;
	height: 28px;
	cursor: pointer;
`;

export const ToggleInput = styled.input`
	opacity: 0;
	width: 0;
	height: 0;
`;

export const Slider = styled.span<{ checked: boolean }>`
	position: absolute;
	inset: 0;
	border-radius: 34px;
	overflow: hidden;
	background-color: #ccc; /* fallback base color */
	will-change: opacity;

	/* Layer for ON color (purple) */
	&::before {
		content: "";
		position: absolute;
		inset: 0;
		background-color: #b101b1;
		opacity: ${({ checked }) => (checked ? 1 : 0)};
		transition: opacity 300ms ease;
		will-change: opacity;
		z-index: 0;
	}

	/* Toggle knob */
	&::after {
		content: "";
		position: absolute;
		height: 20px;
		width: 20px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		border-radius: 50%;
		z-index: 1;

		transform: ${({ checked }) => (checked ? "translateX(22px)" : "translateX(0px)")};
		transition: transform 300ms ease;
		will-change: transform;
	}
`;
