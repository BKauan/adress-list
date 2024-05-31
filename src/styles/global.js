import { createGlobalStyle } from "styled-components";
const Global = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    font-family: 'poppins', sans-serif;
  }
  
  body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #f2f2f2;
  }

  #edit-button{
    position: absolute;
    top: 10px;
    right: 10px;
  }

  #delete-button{
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  #item-name {
    font-weight: bold;
    font-size: 24px;
  }

  #item-name > svg{
    margin-right:5px
  }

  #item-code{
    position: absolute;
    bottom: 20px;
    left: 20px;
  }
`;

export default Global;