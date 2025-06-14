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
  font-size: 1em;
  line-height: 1.4;         /* TinyMCE’s default line-height  [oai_citation:0‡stackoverflow.com](https://stackoverflow.com/questions/68354437/adding-css-class-based-options-to-tinymce-fontsizeselect?utm_source=chatgpt.com) */
  color: #222;

  * { box-sizing: border-box; }

  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
  }

  h1 { 
    font-size: 2em; 
    margin: 0.67em 0;
  }
  h2 { 
    font-size: 1.5em; 
    margin: 0.83em 0;
  }
  h3 { 
    font-size: 1.17em; 
    margin: 1em 0;
  }
  h4 { 
    /* font-size: 1.25em;  */
    margin: 1.33em 0;
    /* color: initial; */
  }
  h5 { 
    font-size: 0.83em; 
    margin: 1.67em 0;
  }
  h6 { 
    font-size: 0.67em; 
    margin: 2.33em 0;
  }

  /* Paragraphs */
  p {
    margin: 1em 0;          /* consistent with browser default + TinyMCE spacing  */
    word-wrap: break-word;
  }

  /* Lists */
  ul, ol {
    margin: 1em 0;

    display: block;
    padding-inline-start: 40px;
  }
  /* li { margin-bottom: 0.5rem; } */

  /* Images */
  img {

  }

  /* Links */
  a {
    color: #0056b3;
    text-decoration: underline;
  }

  /* Blockquotes, Code, and Preformatted text */
  blockquote {
    margin: 0.5em 0;
    padding-left: 0.5em;
    border-left: 2px solid #ccc;
    color: #555;
    font-style: italic;
    margin-inline-start: 10px;
  }

  pre {
    margin: 0.5em 0;
    padding: 0.5em 1em;
    background-color: #f5f5f5;
    overflow-x: auto;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.813em;
  }

  code {
    background-color: #eee;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9em;
  }

  /* Horizontal Rule */
  hr {
    margin: 0.5em 0;
    border: none;
    border-top: 1px solid #ccc;
  }
`;

export const BlogPreviewContent = styled.div`
  ${blogRenderStyle};
  margin: 16px;
`;
