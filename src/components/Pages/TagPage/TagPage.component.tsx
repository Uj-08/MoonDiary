import React from 'react'
import { TagPageTypes } from './TagPage.types';
import { Container, FeatureHeader } from './TagPage.styles';
import ArticleGrid from '@/components/ArticleGrid/ArticleGrid.component';

const TagPage = ({ tagId, tagName, blogsArray }: TagPageTypes) => {
    const API_INSTANCE = React.useMemo(() => {
        if (typeof window === "undefined" || !tagId) return null;
        return new URL(`/api/tags/${tagId}`, window.location.origin);
    }, [tagId]);

    return (
        <Container>
            <FeatureHeader>#{tagName}</FeatureHeader>
            <ArticleGrid blogsArray={blogsArray} API_INSTANCE={API_INSTANCE} />
        </Container>
    )
}

export default React.memo(TagPage);