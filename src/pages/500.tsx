import React, { useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import { anton } from "@/styles/fonts";

const Container = styled.div`
  padding-top: 60px;
  min-height: calc(100dvh - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 3rem;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  margin: -50px 0;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const Illustration = styled.div`
  max-width: 180px;
  margin: 0 -54px;

  svg {
    width: 100%;
    height: auto;
  }

  .twinkle {
    animation: twinkle 1.5s infinite ease-in-out;
    transform-origin: center;
  }

  @keyframes twinkle {
    0%, 100% {
      opacity: 0.4;
    }
    50% {
      opacity: 1;
    }
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;

  @media (max-width: 640px) {
    align-items: center;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 6rem;
  font-family: ${anton.style.fontFamily}, sans-serif;
  color: #232323;
  margin: 0;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #454545;
`;

const StyledButton = styled.button`
  padding: 1rem 2rem;
  border-radius: 10px;
  background-color: #232323;
  color: white;
  font-weight: 500;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  transition: background 0.2s ease;

  &:hover {
    background-color: #000;
  }
`;

const Custom500 = () => {
  const router = useRouter();

  const [originalPath, setOriginalPath] = useState<string | null>(null);

  useEffect(() => {
    const pathFromQuery = router.query.origin as string;
    if (pathFromQuery) {
      setOriginalPath(pathFromQuery);
    } else {
      setOriginalPath("/")
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
    <>
      <Head>
        <title>500 | Server Error</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Container>
        <FlexRow>
          <Illustration>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none">
              <circle cx="100" cy="100" r="40" fill="#000" opacity="0.8" />
              <circle cx="90" cy="95" r="32" fill="#ffffff" />
              <circle cx="40" cy="50" r="1.5" fill="#000" className="twinkle"/>
              <circle cx="170" cy="40" r="2" fill="#000" className="twinkle"/>
              <circle cx="60" cy="130" r="1.8" fill="#000" className="twinkle"/>
              <circle cx="155" cy="150" r="1.2" fill="#000" className="twinkle"/>
              <circle cx="120" cy="30" r="1.5" fill="#000" />
              <circle cx="30" cy="160" r="1.5" fill="#000" />
              <ellipse cx="100" cy="100" rx="50" ry="8" stroke="#000" strokeWidth="0.5" opacity="0.2" />
            </svg>
          </Illustration>
          <Title>500</Title>
        </FlexRow>

        <TextBlock>
          <Subtitle>{"Something went wrong on our end."}</Subtitle>
        </TextBlock>

        <StyledButton onClick={handleRetry}>Try Again</StyledButton>
      </Container>
    </>
  );
};

export default Custom500;