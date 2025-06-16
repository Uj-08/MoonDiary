import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div`
  padding: 14px 24px;
  max-width: 170px;
  background-color: red;
  display: flex;
  gap: 12px;
  color: white;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  transition: box-shadow linear 200ms;
  font-family: "Arimo", sans-serif;
  font-weight: bold;
  align-self: flex-end;
  cursor: pointer;

  background: rgba( 189, 16, 224, 0.75 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 7.5px );
  -webkit-backdrop-filter: blur( 7.5px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );

  :hover {
    box-shadow: rgba(177, 1, 177, 0.2) 0px 12px 28px 0px,
      rgba(177, 1, 177, 0.1) 0px 2px 4px 0px,
      rgba(177, 1, 177, 0.05) 0px 0px 0px 1px inset;
  }
  div {
    display: flex;
    align-items: center;
    svg {
      transform: scale(1.3);
      fill: white;
    }
  }
`;

export default function AddPostButton() {
  return (
    <Link href={"/blogs/post"}>
      <Container>
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
        <div>
          ADD POST
        </div>
      </Container>
    </Link>
  );
}
