import styled from "styled-components";

export const Container = styled.div`
    height: 480px;
    width: 330px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: rgb(0 0 0 / 20%) 0px 12px 28px 0px, rgb(0 0 0 / 10%) 0px 2px 4px 0px, rgb(255 255 255 / 5%) 0px 0px 0px 1px inset;
    cursor: pointer;
`;

export const ImageContainer = styled.div`
    position: relative;
    height: 50%;
    img {
        width: 100%;
        aspect-ratio: 4/3;
        object-fit: cover;
        object-position: center;
    }
`;

export const CardDetails = styled.div`
    padding: 5px 10px;
    overflow: hidden;
    height: min-content;
    display: flex;
    flex-direction: column;
    gap: 5px;
    * {
        /* border: 2px solid red; */
    }
`;

export const BlogHeader = styled.div`
    height: 15px;
    /* background-color: red; */
`;

export const BlogTitle = styled.h2`
    font-family: "Arimo", sans-serif;
    text-align: left;
`;

export const BlogData = styled.p`
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    /* height: 100%; */
`;

export const BlogAuthor = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 25px;
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