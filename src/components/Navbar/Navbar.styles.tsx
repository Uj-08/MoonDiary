import { anton } from "@/styles/fonts";
import styled from "styled-components";
import { FaInstagram } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuAtSign } from "react-icons/lu";


export const Wrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8rem;
    height: 60px;
    border-top: none;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    z-index: 10;
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
    aspect-ratio: 1;
    width: 35px;
    &:hover {
        img {
            transform: rotate(360deg);
        }
    }
    img {
        transition: transform 0.3s linear;
        cursor: pointer;
    }
`;

export const NavLinks = styled.ul<{ $isHamburger?: boolean }>`
    margin-right: -81px;
    color: #272727;
    display: flex;
    flex-direction: ${props => props.$isHamburger ? "column" : "row"};
    align-items: ${props => props.$isHamburger ? "center" : ""};
    list-style: none;
    gap: 4rem;
    @media (max-width: 1200px) {
        gap: 2rem;
    }
    @media (max-width: 950px) {
        display: ${props => !props.$isHamburger && "none"};
        margin-right: 0;
    }
`;

export const NavLink = styled.li<{ $isHamburger?: boolean }>`
    cursor: pointer;
    text-transform: ${props => !props.$isHamburger && "uppercase"};
    font-family: ${(props) =>
    props.$isHamburger
        ? `"Segoe UI", Tahoma, Geneva, Verdana, sans-serif`
        : `${anton.style.fontFamily}, sans-serif`};
    font-size: 1.3rem;
    letter-spacing: ${props => !props.$isHamburger && "2px"};
    transition: color linear 200ms;

    &:hover {
        color: #b101b1;
    }
`

export const EmailIcon = styled(LuAtSign)`
    stroke-width: 2.5px;
`;

export const InstagramIcon = styled(FaInstagram)`
    stroke-width: 8px;
`;

export const ProfileIcon = styled(CgProfile)`
    stroke-width: 0.3px;
`;

export const HamburgerIcon = styled(RxHamburgerMenu)`
    stroke-width: 10px;
`

export const SocialLinks = styled.ul<{ $isHamburger?: boolean }>`
    display: flex;
    list-style: none;
    height: ${props => (!props.$isHamburger ? "100%" : "auto")};
    justify-content: ${props => (props.$isHamburger ? "space-evenly" : "normal")};
    border-top: ${props => (props.$isHamburger ? "1px solid #75757549" : "none")};
    padding-top: ${props => (props.$isHamburger ? "20px" : "0")};
    margin: ${props => (props.$isHamburger ? "0 -16px" : "0 -9px 0 0")};

    @media (max-width: 950px) {
        display: ${props => !props.$isHamburger && "none"};
    }
`;

export const SocialLink = styled.li`
    cursor: pointer;
    padding: 0 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    transition: background-color linear 200ms;

    .social_icon {
        width: 25px;
        height: 25px;
    }

    &:hover {
        background-color: #AE4FE9;
        color: #fff;
        /* Disable hover effects on small screens */
        @media (max-width: 950px) {
            background-color: unset;
            color: unset;
        }
    }
`;

export const HamburgerButton = styled.div<{ enabled?: boolean }>`
    display: none;
    .hamburger_icon {
        width: 35px;
        height: 35px;
        stroke-width: 1px;
    }
    @media (max-width: 950px) {
        display: block;
    }
`;

export const Profile = styled.span`
    display: flex;
    position: relative;
    height: 26px;
    width: 26px;
    border-radius: 100%;
    overflow: hidden;
    text-align: left;
    transform: translateY(-2px);
    img {
        width: 100%;
        object-fit: cover;
}
`;