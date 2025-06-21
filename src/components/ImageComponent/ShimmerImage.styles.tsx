import { keyframes, styled } from "styled-components";

export const Container = styled.div<{
    width?: number;
    $aspectRatio?: number;
}>`
    position: relative;
    ${({ width }) => `width: ${width ? `${width}px` : "100%"};`}
    aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
    img {
        width: 100%;
        height: 100%;
    }
`;

export const placeholderShimmer = keyframes`
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
`;

export const Shimmer = styled.div<{ $isLoading: boolean }>`
    position: absolute;
    width: 100%;
    height: 100%;
    background: #e9e9e9;
    overflow: hidden;
    opacity: ${({ $isLoading }) => ($isLoading ? 1 : 0)};
    transition: opacity 200ms cubic-bezier(0.3, 0.2, 0.2, 0.8);

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to right, #e9e9e9 0%, #fff 20%, #f2f2f2 40%, #e9e9e9 100%);
        transform: translateX(-100%);
        animation: ${placeholderShimmer} 1s linear infinite;
        will-change: transform;
    }

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.2); /* 20% black overlay */
        pointer-events: none;
    }

`;