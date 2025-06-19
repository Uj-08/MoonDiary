"use client"
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ImageAspectRatioTypes } from "./ShimmerImage.types";
import { Container, Shimmer } from "./ShimmerImage.styles";


const ShimmerImage = ({
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

export default React.memo(ShimmerImage);
