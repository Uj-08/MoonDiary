import { Preview, PreviewContainer, PreviewImageContainer } from "./Blog.styles";
import Image from "next/image";
import { PreviewData } from "../Editor/Editor.styles";
import parse from "html-react-parser";

export interface BlogComponentTypes {
    blogImg?: string,
    blogData?: string,
}

export default function BlogComponent({ blogImg, blogData }: BlogComponentTypes) {
    return (
        <PreviewContainer>
            <Preview>
                <PreviewImageContainer>
                    <Image src={blogImg || "https://www.urbansplash.co.uk/images/placeholder-16-9.jpg"} alt={"hero image"} fill={true} />
                </PreviewImageContainer>
            </Preview>
                <PreviewData>
                    {blogData ? parse(blogData) : ""}
                </PreviewData>
        </PreviewContainer>
    )
};