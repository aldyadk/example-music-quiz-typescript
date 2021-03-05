import styled, {createGlobalStyle} from 'styled-components'

interface WrapperProps {
  mb?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height:${p => p.mb ? 'none' : '400px'};
  margin-bottom: ${p => p.mb ? '40px' : '0'};
  background-color: ${p => p.mb ? 'transparent' : 'rgb(240, 144, 184)'};
  background-image: ${p => p.mb ? 'none' : 'linear-gradient(rgba(0,0,0,.6),#121212)'};
`

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    background-color: #121212;
  }

  * {
    color: white;
    font-family: 'RocknRoll One';
  }

  button {
    border: 0;
    height: 30px;
    min-width: 300px; 
    padding: 0 30px;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 15px;
    background-color: #1db954;
  }

  .disabled {
    cursor: default;
    background-color: #b3b3b3;
  }

  .question {
    margin: 40px 0;
    font-weight: bold;
    text-align: center;
  }

  .green-border {
    border-bottom: 3px solid #1db954;
  }

  /* h1 {
    background-image: linear-gradient(#1db954, white);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  } */

`