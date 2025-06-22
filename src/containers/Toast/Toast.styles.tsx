import { montserrat } from "@/styles/fonts";
import styled, { css } from "styled-components";

export const ToastContainer = styled.div<{
	visible: boolean;
	isError: boolean;
}>`
	opacity: ${(props) => (props.visible ? 1 : 0)};
	transform: translateX(${(props) => (props.visible ? "0" : "100%")});
	transition:
		transform 300ms ease-in-out,
		opacity 300ms ease-in-out;
	color: #fff;
	padding: 1rem;
	border-radius: 8px;
	font-family: ${montserrat.style.fontFamily};

	${({ isError }) =>
		isError
			? css`
					background: rgba(208, 2, 27, 0.75);
					box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
					backdrop-filter: blur(7.5px);
					-webkit-backdrop-filter: blur(7.5px);
					border-radius: 10px;
					border: 1px solid rgba(255, 255, 255, 0.18);
				`
			: css`
					background: rgba(144, 19, 254, 0.75);
					box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
					backdrop-filter: blur(7.5px);
					-webkit-backdrop-filter: blur(7.5px);
					border-radius: 10px;
					border: 1px solid rgba(255, 255, 255, 0.18);
				`}
`;
