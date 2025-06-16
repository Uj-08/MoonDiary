import { anton } from "@/styles/fonts";
import { FeaturesTagType } from "@/types/tag";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  padding: 8px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 10px;
  color: #474646;
  cursor: pointer;
  min-height: 120px;
  overflow: hidden;
  font-family: ${anton.style.fontFamily}, sans-serif;
  letter-spacing: 0.7px;

  background: rgba(163, 163, 163, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;

  &:hover {
    color: #000000;
    transform: translateY(-4px) scale(1.02);
    background: rgba(255, 255, 255, 0.5);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

export const Text = styled.span`
  text-align: center;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const FeatureCard = ({
    tag,
}: {
    tag: FeaturesTagType
}) => {
    return (
        <Link href={`/features/${tag._id}`}>
            <Container>
                <Text>#{tag.name}</Text>
                <span>({tag.nonDraftCount})</span>
            </Container>
        </Link>
    );
};

export default FeatureCard;
