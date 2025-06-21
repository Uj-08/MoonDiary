import React from "react";
import Link from "next/link";
import { FeaturesTagType } from "@/types/tag";
import { TagChip, TagLabel, TagCount } from "./FeatureCard.styles";

const FeatureCard = ({ tag }: { tag: FeaturesTagType }) => {
  return (
    <Link href={`/features/${tag._id}`} passHref>
      <TagChip>
        <TagLabel>#{tag.name}</TagLabel>
        <TagCount>{tag.nonDraftCount}</TagCount>
      </TagChip>
    </Link>
  );
};

export default React.memo(FeatureCard);