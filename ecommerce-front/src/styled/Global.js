import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Lato', sans-serif;
    }
    #root {
        width: 100vw;
        height: 100vh;
        background-color: #fffaf0;
    }
`
export default Global;