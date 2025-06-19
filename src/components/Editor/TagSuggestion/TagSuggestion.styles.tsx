import { montserrat } from "@/styles/fonts";
import { styled } from "styled-components";

export const Container = styled.div`
    position: relative;
`;

export const SuggestionWindow = styled.ul`
    position: absolute;
    top: calc(100% - 6px);
    left: 0;
    width: 100%;
    z-index: 10;
    margin: 0;
    padding: 5px 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
    backdrop-filter: blur(5px);
    padding: 10px 8px;
    box-shadow: rgb(0 0 0 / 20%) 0px 12px 28px 0px,
    rgb(0 0 0 / 10%) 0px 2px 4px 0px,
    rgb(255 255 255 / 5%) 0px 0px 0px 1px inset;
    border-radius: 10px;
`;

export const Suggestion = styled.li`
    font-family: ${montserrat.style.fontFamily};
    background-color: #fff;
    padding: 5px 10px; 
    cursor: pointer;
    box-shadow:
        rgb(0 0 0 / 10%) 0px 12px 28px 0px,
        rgb(0 0 0 / 5%) 0px 2px 4px 0px,
        rgb(255 255 255 / 2.5%) 0px 0px 0px 1px inset;
    border-radius: 10px;
    opacity: 0.7;
    transition: opacity 300ms linear;
    transition: box-shadow 300ms linear;
    &:hover {
        opacity: 1;
        box-shadow: 
        rgb(0 0 0 / 20%) 0px 12px 28px 0px,
        rgb(0 0 0 / 10%) 0px 2px 4px 0px,
        rgb(255 255 255 / 5%) 0px 0px 0px 1px inset;
    }
    &:active {
        opacity: 1;
        box-shadow: 
            rgb(0 0 0 / 20%) 0px 12px 28px 0px,
            rgb(0 0 0 / 10%) 0px 2px 4px 0px,
            rgb(255 255 255 / 5%) 0px 0px 0px 1px inset;
    }
`;