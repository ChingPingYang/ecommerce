import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Lato', sans-serif;
    }
    body, html {
        width: 100vw;
        min-height: 100vh;
        display: flex;
    }
    #root {
        width: 100vw;
    }
`
export default Global;