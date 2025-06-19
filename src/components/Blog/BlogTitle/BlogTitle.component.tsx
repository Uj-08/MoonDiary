import React from "react";
import { ReactNode } from "react";
import { BlogTitle, BlogTitleContainer } from "./BlogTitle.styles";

const BlogTitleComponent = ({ children }: { children: ReactNode }) => {
    return (
        <BlogTitleContainer>
            <BlogTitle>
                {children}
            </BlogTitle>
        </BlogTitleContainer>
    )
};

export default React.memo(BlogTitleComponent);