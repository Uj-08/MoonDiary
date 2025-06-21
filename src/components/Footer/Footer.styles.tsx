import styled from "styled-components"

export const Footer = styled.footer`
    display: flex;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 5px 0px, rgb(0 0 0 / 10%) 0px 0px 1px 0px;
    background-color: white;
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 120px;
    width: 100%;
    gap: 20px;
    margin-top: 100px;
`;

export const FooterIconContainer = styled.ul`
    list-style: none;
    display: flex;
    gap: 70px;
`;

export const FooterIcon = styled.li`
    height: 20px;
    aspect-ratio: 1;
    img {
        opacity: 0.7;
    }
    .social_link {
        width: 20px;
        height: 20px;
        position: relative;
        color: #5f5f5f;
    }
`;

export const CopyrightText = styled.span`
    font-family: Verdana, Geneva, Tahoma, sans-serif;;
    font-size: 12px;
    color: #8a8a8a;
`;