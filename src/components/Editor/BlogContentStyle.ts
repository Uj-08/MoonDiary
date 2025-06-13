export const blogContentStyle = /* css */ `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

  body {
    font-family: "Montserrat", sans-serif;
    color: #222;
  }

  img {
    max-width: 100%;
    display: block;
    border-radius: 12px;
  }

  a {
    color: #0056b3;
    text-decoration: underline;
  }

  pre, code {
    font-family: monospace;
  }

  .mce-content-body::before {
    font-family: "Montserrat", sans-serif;
    color: #888;
  }
`;

import styled, { css } from "styled-components";

export const blogRenderStyle = css`
  font-family: "Montserrat", sans-serif;
  color: #222;
  font-size: 16px;
  line-height: 1.6;

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    /* margin: 1.5em 0 1em; */
    margin-bottom: 1em;
  }

  h1 { font-size: 2rem; }
  h2 { font-size: 1.75rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.25rem; }
  h5 { font-size: 1.1rem; }
  h6 { font-size: 1rem; }

  p {
    margin-bottom: 0.1em;
    word-break: break-word;
  }

  ul, ol {
    padding-left: 2em;
    margin-bottom: 0.5em;
  }

  li {
    /* margin-bottom: 0.5em; */
  }

  a {
    color: #0056b3;
    text-decoration: underline;
    word-break: break-word;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    border-radius: 12px;
    margin: 0.5em;
  }

  blockquote {
    border-left: 4px solid #ccc;
    padding-left: 1em;
    margin-bottom: 0.5em;
    color: #555;
    font-style: italic;
  }

  pre {
    background-color: #f9f9f9;
    margin-bottom: 0.5em;
    overflow-x: auto;
    border-radius: 6px;
    font-size: 0.95rem;
  }

  code {
    background-color: #eee;
    /* padding: 0.2em 0.4em; */
    margin-left: 1em;
    margin-bottom: 0.2em;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9em;
  }

  hr {
    border: none;
    border-top: 1px solid #ccc;
    /* margin: 2em 0; */
    margin-bottom: 1em;
  }
`;

export const BlogPreviewContent = styled.div`
  ${blogRenderStyle};
  padding: 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;
