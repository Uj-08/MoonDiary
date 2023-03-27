import { ReactNode } from "react";
import { BlogTitle, BlogTitleContainer } from "./BlogTitle.styles";

export default function BlogTitleComponent({ children }: { children: ReactNode }) {
    return (
        <BlogTitleContainer>
            <BlogTitle>
                {children}
            </BlogTitle>
        </BlogTitleContainer>
    )
};