import React from "react";
import { FeaturesTagType } from "@/types/tag";
import Link from "next/link";
import { Container, Text } from "./FeatureCard.styles";

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
