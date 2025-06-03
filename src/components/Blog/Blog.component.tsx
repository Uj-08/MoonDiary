import {
  Preview,
  PreviewContainer,
  PreviewImageContainer,
} from "./Blog.styles";
import Image from "next/image";
import { PreviewData } from "../Editor/Editor.styles";
import parse from "html-react-parser";
import { useState } from "react";

export interface BlogComponentTypes {
  blogImg?: string;
  blogData?: string;
}

export default function BlogComponent({
  blogImg,
  blogData,
}: BlogComponentTypes) {
  const [blogImage, setBlogImage] = useState(
    blogImg ?? "https://www.urbansplash.co.uk/images/placeholder-16-9.jpg"
  );
  return (
    <PreviewContainer>
      <Preview>
        <PreviewImageContainer>
          <Image
            src={blogImage}
            alt={"hero image"}
            fill={true}
            onError={() =>
              setBlogImage(
                "https://www.urbansplash.co.uk/images/placeholder-16-9.jpg"
              )
            }
          />
        </PreviewImageContainer>
      </Preview>
      <PreviewData>{blogData ? parse(blogData) : ""}</PreviewData>
    </PreviewContainer>
  );
}
