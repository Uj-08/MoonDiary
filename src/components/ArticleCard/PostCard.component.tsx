import styled from "styled-components";
import { useRouter } from "next/router";

export const Container = styled.div`
  width: 100%;
  max-width: 350px;
  aspect-ratio: 2/3;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: rgb(0 0 0 / 20%) 0px 12px 28px 0px,
    rgb(0 0 0 / 10%) 0px 2px 4px 0px,
    rgb(255 255 255 / 5%) 0px 0px 0px 1px inset;
  cursor: pointer;
  background-color: rgb(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  transition: box-shadow linear 200ms;
  :hover {
    box-shadow: rgba(177, 1, 177, 0.2) 0px 12px 28px 0px,
      rgba(177, 1, 177, 0.1) 0px 2px 4px 0px,
      rgba(177, 1, 177, 0.05) 0px 0px 0px 1px inset;
  }
  div {
    svg {
      transform: scale(2);
      fill: white;
    }
  }
`;

export default function PostCard() {
  const router = useRouter();
  return (
    <Container onClick={() => router.push("/blogs/post")}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      </div>
    </Container>
  );
}
