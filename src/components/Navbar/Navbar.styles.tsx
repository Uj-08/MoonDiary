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
    img {
        height: 100%;
        width: 100%;
        cursor: pointer;
    }
`;

export const NavLinks = styled.ul`
    display: flex;
    list-style: none;
    gap: 4rem;
    @media (max-width: 1200px) {
        gap: 2rem;
    }
    @media (max-width: 950px) {
        display: none;
    }
    li {
        cursor: pointer;
        text-transform: uppercase;
        font-family: 'Anton', sans-serif;
        font-size: 1.3rem;
        letter-spacing: 2px;
    }
    li:hover {
        color: #b101b1;
    }
`;

export const SocialLinks = styled.ul`
    display: flex;
    list-style: none;
    height: 100%;
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
        display: none;
    }
`;

export const HamburgerButton = styled.button<{ enabled?: boolean }>`
    border: none;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    height: 45px;
    width: 45px;
    padding: 11px 5px;
    gap: 5px;
    span {
        display: block;
        background-color: black;
        width: 100%;
        height: 3px;
        border-radius: 8px;
    }
`;