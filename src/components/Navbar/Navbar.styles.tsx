import styled from "styled-components";

export const Wrapper = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8rem;
    height: 60px;
    border-top: none;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 5px 0px, rgb(0 0 0 / 10%) 0px 0px 1px 0px;
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

export const LogoContainer = styled.div`
    position: relative;
    aspect-ratio: 1;
    width: 45px;
    @media (max-width: 450px) {
        width: 35px;
    }
    -webkit-tap-highlight-color: transparent;
    :active {
        img {
            transform: rotate(360deg);
        }
    }
    img {
        transition: transform 0.3s linear;
        height: 100%;
        width: 100%;
        cursor: pointer;
    }
`;

export const NavLinks = styled.ul<{ isHamburger?: boolean }>`
    display: flex;
    flex-direction: ${props => props.isHamburger ? "column" : "row"};
    align-items: ${props => props.isHamburger ? "center" : ""};
    list-style: none;
    gap: 4rem;
    @media (max-width: 1200px) {
        gap: 2rem;
    }
    @media (max-width: 950px) {
        display: ${props => !props.isHamburger && "none"};
    }
    li {
        cursor: pointer;
        text-transform: ${props => !props.isHamburger && "uppercase"};
        font-family: ${props => props.isHamburger ? "Segoe UI,Tahoma,Geneva,Verdana,sans-serif" : "Anton, sans-serif"};
        font-size: 1.3rem;
        letter-spacing: ${props => !props.isHamburger && "2px"};
    }
    li:hover {
        color: #b101b1;
    }
`;

export const SocialLinks = styled.ul<{ isHamburger?: boolean }>`
    display: flex;
    list-style: none;
    height: ${props => !props.isHamburger && "100%"};
    justify-content: ${props => props.isHamburger && "space-evenly"};
    border-top: ${props => props.isHamburger && "1px solid #75757549"};
    padding-top: ${props => props.isHamburger && "20px"};
    margin: ${props => props.isHamburger && "0 -16px"};
    li {
        cursor: pointer;
        padding: 0 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    li:hover {
        background-color: #51b016;
        filter: invert(1);
    }
    @media (max-width: 950px) {
        display: ${props => !props.isHamburger && "none"};
    }
`;

export const HamburgerButton = styled.button<{ enabled?: boolean }>`
    border: none;
    background-color: transparent;
    flex-direction: column;
    height: 45px;
    width: 45px;
    padding: 11px 5px;
    gap: 5px;
    :active {
        span {
            background-color: #8c8c8c;
        }
    }
    span {
        transition: 0.2s background-color linear;
        display: block;
        background-color: black;
        width: 100%;
        height: 4px;
        border-radius: 8px;
    }
    display: none;
    @media (max-width: 950px) {
        display: flex;
    }
`;