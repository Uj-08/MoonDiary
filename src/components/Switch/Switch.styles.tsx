import styled from "styled-components";

export const SwitchContainer = styled.div`
    background-color: #e0e0e0;
    border-radius: 50px;
    display: flex;
    padding: 4px;
    position: relative;
    width: fit-content;
`;

export const SwitchOption = styled.button<{ active: boolean }>`
    position: relative;
    z-index: 1; /* above indicator */
    background-color: transparent;
    color: ${({ active }) => (active ? "#fff" : "#333")};
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s ease;
    font-family: "Arimo", sans-serif;

    &:hover {
        background-color: transparent;
    }
`;

export const ActiveIndicator = styled.div<{ $position: "left" | "right" }>`
    position: absolute;
    top: 4px;
    left: ${({ $position }) => ($position === "left" ? "4px" : "calc(100% - 50% - 4px)")};
    width: 50%;
    height: calc(100% - 8px);
    background-color: #b101b1;
    border-radius: 50px;
    transition: all 0.3s ease;
    z-index: 0;
`;