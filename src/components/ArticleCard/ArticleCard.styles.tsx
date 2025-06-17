import styled from "styled-components";
import { ReadTimeBadge } from "../Blog/Blog.styles";

export const Container = styled.div<{ isDraft: boolean }>`
  width: 100%;
  max-width: 350px;
  min-width: 300px;
  aspect-ratio: 2/3;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: rgb(0 0 0 / 20%) 0px 12px 28px 0px,
    rgb(0 0 0 / 10%) 0px 2px 4px 0px,
    rgb(255 255 255 / 5%) 0px 0px 0px 1px inset;
  cursor: pointer;
  justify-self: center;
  transition: box-shadow linear 200ms;
  &:hover {
    box-shadow: rgba(177, 1, 177, 0.2) 0px 12px 28px 0px,
      rgba(177, 1, 177, 0.1) 0px 2px 4px 0px,
      rgba(177, 1, 177, 0.05) 0px 0px 0px 1px inset;
  }
  ${({ isDraft }) => isDraft && "filter: grayscale(1)"};
  display: flex;
  flex-direction: column;
`;

export const ImageContainer = styled.div`
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 200ms linear;
    &:hover {
      transform: scale(1.02);
    }
  }
`;

export const CardReadTimeBadge = styled(ReadTimeBadge)`
  padding: 3px 6px;
  font-size: 0.6em;
`

export const ButtonsContainer = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  margin-left: auto;
  font-size: 13px;
  gap: 8px;
  padding-right: 8px;
`;

export const EditButton = styled.button`
  all: unset;
  border-radius: 8px;
  border: 1px solid #009FBD;
  padding: 5px 8px;
  background-color: #ffff;
  color: #009FBD;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  /* opacity: 0.7; */
  transition: background-color linear 0.2s;
  /* transition: color linear 0.3s; */
  /* :hover {
    opacity: 1;
  } */
  &:hover {
    background-color: #009FBD;
    color: #ffff;
  }
`;

export const DeleteButton = styled(EditButton)`
  background-color: #ffff;
  border: 1px solid #F31559;
  color: #F31559;
  &:hover {
    background-color: #F31559;
    color: #ffff;
  }
`;

export const CardDetails = styled.div`
  flex: 1;
  padding: 5px 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  * {
    /* border: 2px solid red; */
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const BlogHeader = styled.div`
  height: 25px;
  /* background-color: red; */
`;

export const TagsContainer = styled.div`
  display: flex;
  padding: 4px 0 0 0;
  gap: 4px;
`;

export const Tag = styled.h3<{ 
  bgColor: string, 
  maxWidth: string, 
  fontSize: string, 
  letterSpacing: string 
}>`
  all: unset;
  cursor: pointer;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 2px 8px;
  /* background-color: rgb(177, 1, 177); */
  /* background-color: rgb(177, 1, 177); */
  background-color: ${({ bgColor }) => bgColor};
  display: flex;
  align-items: center;
  border-radius: 8px;
  /* font-size: 12px; */
  /* letter-spacing: 0.5px; */
  color: white;
  ${({ fontSize, letterSpacing }) => `font-size: ${fontSize}; letter-spacing: ${letterSpacing};`}
  opacity: 0.8;
  transition: opacity 200ms linear;
  &:hover {
    opacity: 1;
  }
  span {
    ${({ maxWidth }) => `max-width: ${maxWidth};`}
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const MoreTag = styled.div<{ color: string }>`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 2px 8px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  font-size: 12px;
  letter-spacing: 0.5px;
  color: ${({ color }) => color};
  border: ${({ color }) => `1px solid ${color}`};
  background-color: #fff;
  span {
    max-width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const BlogTitle = styled.h2`
  font-family: "Arimo", sans-serif;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  @media (max-width: 1200px) {
    font-size: 1.3rem;
  }
`;

export const BlogData = styled.p`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 100%;
`;

export const BlogAuthorContainer = styled.div`
  flex: 1;
  display: flex;
  max-height: 60px;
`;

export const BlogAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

export const AuthorProfile = styled.div`
  position: relative;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  overflow: hidden;
  text-align: left;
  img {
    width: 100%;
    object-fit: cover;
  }
`;

export const AuthorDetail = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Arimo", sans-serif;
  gap: 1px;
  flex: 1;
  div {
    &:first-child {
      font-weight: 700;
      font-size: 13px;
    }
    &:last-child {
      font-weight: 200;
      font-size: 10px;
      color: #9a9a9a;
    }
  }
`;
