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

    ul {
        list-style: none;
        display: flex;
        gap: 70px;
        li {
            /* border: 1px solid black; */
            width: 20px;
            height: 20px;
            display: block;
            position: relative;
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }  
        }
    }

    span {
        font-family: Verdana, Geneva, Tahoma, sans-serif;;
        font-size: 12px;
        color: #8a8a8a;
    }
`;  

export const LogoContainer = styled.li`
    &:hover {
        img {
            transform: rotate(360deg);
        }
    }
    img {
        transition: transform 0.3s linear;
    }
`