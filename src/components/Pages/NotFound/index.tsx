"use client"
import React from 'react'
import { Container, FlexRow, Illustration, StyledLink, Subtitle, TextBlock, Title } from './NotFound.styles'

const NotFound = () => {
  return (
    <Container>
      <FlexRow>
        <Illustration>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none">
            {/* Moon */}
            <circle cx="100" cy="100" r="40" fill="#000" opacity="0.8" />
            <circle cx="90" cy="95" r="32" fill="#ffffff" />

            {/* Stars */}
            <circle cx="40" cy="50" r="1.5" fill="#000" className="twinkle" />
            <circle cx="170" cy="40" r="2" fill="#000" className="twinkle" />
            <circle cx="60" cy="130" r="1.8" fill="#000" className="twinkle" />
            <circle cx="155" cy="150" r="1.2" fill="#000" className="twinkle" />
            <circle cx="120" cy="30" r="1.5" fill="#000" />
            <circle cx="30" cy="160" r="1.5" fill="#000" />

            {/* Orbit ring */}
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
        <Title>404</Title>
      </FlexRow>

      <TextBlock>
        <Subtitle>{"Looks like you're lost in the stars."}</Subtitle>
      </TextBlock>

      <StyledLink href="/">Go Home</StyledLink>
    </Container>
  )
}

export default React.memo(NotFound);