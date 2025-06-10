import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    gap: 8px;
    justify-content: center;
    padding: 0 1rem;
    @media (max-width: 920px) {
        flex-direction: column;
        padding: 0;
        max-width: 100%;
        border-radius: 0px;
        box-shadow: none;
    }
    height: 100%;
`;

export const PreviewContainer = styled.section`
    max-width: 60%;
    flex: 1;
    font-family: 'Montserrat', sans-serif;
    background-color: #fff;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    min-height: 800px;
    height: 100%;
    @media (max-width: 920px) {
        max-width: 100%;
        border-radius: 0px;
        box-shadow: none;
    }
    /* @media (max-width: 812px) {
        
    }
    @media (max-width: 450px) {
    } */
`;

export const Preview = styled.div`
    width: 100%;
    height: 100%;
    /* border: 2px solid #eee; */
    @media (max-width: 920px) {

    }
`;

export const PreviewImageContainer = styled.div`
    img {
        object-fit: cover;
        aspect-ratio: 4/3;
    }
    input {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translateX(-25%);
    }
`;

export const AdditionalSection = styled.section`
    max-width: 40%;
    flex-shrink: 0;
    flex-basis: 382px;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 8px;
    @media (max-width: 920px) {
        max-width: 100%;
        padding: 1rem 0;
    }
`

export const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 920px) {
        padding: 0 8px;
        flex-wrap: nowrap;
        overflow-x: scroll;
        ::-webkit-scrollbar {
            display: none;
        }
    }
`;

export const BlogTag = styled.span<{ textColor: string }>`
    padding: 4px 3px;
    font-family: "Arimo", sans-serif;
    font-weight: bold;
    font-style: italic;
    letter-spacing: 0.3px;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 200ms linear;
    :hover {
        opacity: 0.8;
    }
`;

export const AdditionalSectionTitle = styled.div<{ height?: string }>`
    font-family: "Arimo", sans-serif;
    font-size: 1.8rem;
    margin-bottom: 12px;
    ${({height}) => height && `height: ${height};`}
    @media (max-width: 920px) {
        display: none;
    }
`;

export const AdditionalData = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    @media (max-width: 920px) {
        flex-direction: row;
        overflow-X: scroll;
        width: 100%;
        ::-webkit-scrollbar {
            display: none;
        }
        padding: 8px;
        padding-bottom: 40px;
    }
`;

export const AboutCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    gap: 12px;
    max-width: 300px;
    @media (max-width: 920px) { 
        display: none;
    }


   background: linear-gradient(45deg, #7a0bc099, #e94ce999);
  border-radius: 8px;
  padding: 30px 12px;
  color: white;
  box-shadow: 0 2px 6px rgba(122, 11, 192, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(255, 77, 155, 0.2);
  }
`;

export const Author = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
`;

export const AuthorName = styled.h3`
    font-weight: bold;
    font-size: 20px;
`;

export const AuthorBio = styled.p`
    font-style: italic;
    /* letter-spacing: 0.9px; */
    line-height: 17px;
`;

export const AuthorProfile = styled.div`
    position: relative;
    height: 70px;
    width: 70px;
    border-radius: 100%;
    overflow: hidden;
    text-align: left;
    img {
        width: 100%;
        object-fit: cover;
    }
`;