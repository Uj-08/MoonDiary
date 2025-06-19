"use client"
import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";

const Container = styled.div<{
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

const placeholderShimmer = keyframes`
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
	transition: opacity 0.2s cubic-bezier(0.3, 0.2, 0.2, 0.8);

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

// type LoadingTypes = "lazy" | "eager";

interface ImageAspectRatioTypes {
    src: string;
    alt: string;
    isPriority?: boolean;
    quality?: number;
    // loading?: LoadingTypes;
    aspectRatio?: any;
    width?: number;
}

const ImageComponent = ({
    src,
    alt,
    isPriority = false,
    aspectRatio,
    // loading,
    quality,
    width,
}: ImageAspectRatioTypes) => {
    useEffect(() => {
        setImageSource(src)
    }, [src])
    const [imageSource, setImageSource] = useState(src ?? "https://www.codewithfaraz.com/tools/placeholder?size=invalid")
    const [isShimmerMounted, setIsShimmerMounted] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const handleLoading = useCallback(() => {
        setIsLoading(false);
    }, []);

    const unMountShimmer = useCallback(() => {
        setIsShimmerMounted(false);
    }, []);

    const errorHandler = useCallback(() => {
        setImageSource("https://www.codewithfaraz.com/tools/placeholder?size=invalid")
    }, []);
    return (
        <Container
            $aspectRatio={aspectRatio}
            width={width}
            className="aspect-ratio"
        >

            <Image
                title={alt}
                src={imageSource}
                alt={alt}
                // loading={loading}
                decoding="async"
                fill
                priority={isPriority}
                quality={quality}
                onLoad={handleLoading}
                onError={errorHandler}
            />
            {isShimmerMounted && (
                <Shimmer onTransitionEnd={unMountShimmer} title={alt} $isLoading={isLoading} />
            )}
        </Container>
    );
}

export default React.memo(ImageComponent);
