"use client"
import React, { useEffect, useState } from "react";
import { Container, FlexRow, Illustration, StyledButton, Subtitle, TextBlock, Title } from "./ServerError.styles";
import { useRouter } from "next/router";

const ServerError = () => {
    const router = useRouter()

    const [originalPath, setOriginalPath] = useState<string | null>(null);

    useEffect(() => {
        const pathFromQuery = router.query.origin as string;
        if (pathFromQuery) {
            setOriginalPath(pathFromQuery);
        } else {
            setOriginalPath("/");
        }
    }, [router.query]);

    const handleRetry = () => {
        if (originalPath) {
            router.push(originalPath);
        } else {
            router.push("/");
        }
    };
    return (
        <Container>
            <FlexRow>
                <Illustration>
                    <svg
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                    >
                        <circle cx="100" cy="100" r="40" fill="#000" opacity="0.8" />
                        <circle cx="90" cy="95" r="32" fill="#ffffff" />
                        <circle cx="40" cy="50" r="1.5" fill="#000" className="twinkle" />
                        <circle cx="170" cy="40" r="2" fill="#000" className="twinkle" />
                        <circle cx="60" cy="130" r="1.8" fill="#000" className="twinkle" />
                        <circle cx="155" cy="150" r="1.2" fill="#000" className="twinkle" />
                        <circle cx="120" cy="30" r="1.5" fill="#000" />
                        <circle cx="30" cy="160" r="1.5" fill="#000" />
                        <ellipse
                            cx="100"
                            cy="100"
                            rx="50"
                            ry="8"
                            stroke="#000"
                            strokeWidth="0.5"
                            opacity="0.2"
                        />
                    </svg>
                </Illustration>
                <Title>500</Title>
            </FlexRow>

            <TextBlock>
                <Subtitle>{"Something went wrong on our end."}</Subtitle>
            </TextBlock>

            <StyledButton onClick={handleRetry}>Try Again</StyledButton>
        </Container>
    );
};

export default ServerError;
