import {
  Preview,
  PreviewContainer,
  PreviewImageContainer,
} from "./Blog.styles";
import { PreviewData } from "../Editor/Editor.styles";
import parse from "html-react-parser";
import ImageComponent from "../ImageComponent/ImageComponent";

export interface BlogComponentTypes {
  blogImg?: string;
  blogData?: string;
}

export default function BlogComponent({
  blogImg,
  blogData,
}: BlogComponentTypes) {
  return (
    <PreviewContainer>
      <Preview>
        <PreviewImageContainer>
          <ImageComponent
            aspectRatio={4 / 3}
            src={blogImg as string}
            alt="hero image"
            isPriority
          />
        </PreviewImageContainer>
      </Preview>
      <PreviewData>{blogData ? parse(blogData) : ""}</PreviewData>
    </PreviewContainer>
  );
}
