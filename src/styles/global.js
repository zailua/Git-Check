import { createGlobalStyle } from "styled-components";


export default createGlobalStyle`

*{

  outline: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}

html, body, #root{
  min-height: 100%;
}

body{
  background: #ffb7c5;
  font-size: 14px;
  -webkit-font-smoothing: antialiased !important;
}

body, input, button{
  color: #222;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
}

`;