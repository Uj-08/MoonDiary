import { styled } from "styled-components";

export const Container = styled.div<{ visible: boolean }>`
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999999;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: ${(props) => (props.visible ? 1 : 0)};
    transition: opacity 300ms ease-in-out;
    pointer-events: ${(props) => (props.visible ? "all" : "none")};
`;