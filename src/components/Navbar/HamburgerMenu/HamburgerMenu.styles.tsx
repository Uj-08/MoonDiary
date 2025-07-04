import { dancingScript } from "@/styles/fonts";
import { styled } from "styled-components";
import { IoCloseSharp } from "react-icons/io5";

export const Container = styled.div<{ $showHamburger: boolean }>`
	height: 100%;
	width: 100%;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 20;
	${({ $showHamburger }) =>
		$showHamburger ? "backdrop-filter: blur(10px);" : "backdrop-filter: blur(0px);"}
	${({ $showHamburger }) => !$showHamburger && "pointer-events: none;"}
    will-change: backdrop-filter;
	transition: backdrop-filter 200ms linear;
	@media (max-width: 950px) {
		display: "none";
	}
`;

export const HamburgerContainer = styled.nav<{ $showHamburger: boolean }>`
	pointer-events: all;
	height: 100%;
	position: absolute;
	width: 80%;
	right: 0;
	top: 0;
	background-color: #ffff;
	color: black;
	box-shadow:
		rgb(0 0 0 / 40%) 0px 16px 32px 0px,
		rgb(0 0 0 / 20%) 0px 4px 8px 0px,
		rgb(255 255 255 / 10%) 0px 0px 0px 1px inset;
	${({ $showHamburger }) =>
		$showHamburger ? "transform: translateX(0%);" : "transform: translateX(100%);"}
	transition: transform 200ms ease-in-out;
`;

export const TopContainer = styled.div`
	height: 60px;
	border-bottom: 1px solid #75757549;
	display: flex;
	justify-content: space-between;
	padding: 0 16px;
	align-items: center;
`;

export const Title = styled.h2`
	font-family: ${dancingScript.style.fontFamily}, cursive;
	font-size: 2rem;
`;

export const Cross = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	.cross_icon {
		height: 24px;
		width: 24px;
	}
`;

export const CrossIcon = styled(IoCloseSharp)`
	stroke-width: 10px;
`;

export const LinkContainer = styled.div`
	height: calc(100% - 60px);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 20px 16px;
`;

export const ProfileContainer = styled.div`
	border-radius: 100%;
	overflow: hidden;
	position: relative;
	height: 22px;
	aspect-ratio: 1;
	transform: translateY(-3px);
`;
