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
  color: #ffffffa2;
  cursor: pointer;
  min-height: 120px;
  overflow: hidden;
  font-family: Anton, sans-serif;
  letter-spacing: 0.7px;

  background: rgba(0, 0, 0, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;

  &:hover {
    color: #fff;
    transform: translateY(-4px) scale(1.02);
    background: rgba(0, 0, 0, 0.5); /* red accent variation */
    box-shadow: 0 12px 36px rgba(189, 16, 224, 0.4); /* stronger glow in purple */
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
    tagData,
}: {
    tagData: {
        name: string;
        blogIds: Array<string>;
        _id: string;
    };
}) => {
    return (
        <Link href={`/features/${tagData._id}`} legacyBehavior>
            <Container>
                <Text>#{tagData.name}</Text>
                <span>({tagData.blogIds.length})</span>
            </Container>
        </Link>
    );
};

export default FeatureCard;
