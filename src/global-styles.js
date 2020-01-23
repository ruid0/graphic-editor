import { createGlobalStyle, css } from 'styled-components';

const globalCssVariables = css`
  --bg-color: #fff;
  --sec-bg-color: #f6f7f9;
  --bg-color-hover: #ebecf0;
  --canvas-wrapper-background: #6b778c;
  --header-color: #2570b7;
  --link-color: #0052cc;
  --main-text-color: #091e42;
  --secondary-text-color: #6b778c;
  --error-color: #de350b;
  --notification-color: #42526e;
  --success-color: #00875a;
  --warning-color: #ffc400;
  --border-radius: 8px;
  --big-font-size: 24px;
`;

export const GlobalStyles = createGlobalStyle`
  html {
    height: 100vh;
  }
  body {
    ${globalCssVariables}

    font-family: Source Sans Pro, Helvetica Neue, Helvetica, Arial, sans-serif;
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    color: var(--main-text-color);
  }

  a {
    color: var(--link-color);
  }

  p {
    margin: 0;
  }
`;
