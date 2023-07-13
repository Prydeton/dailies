import { styled } from 'goober'

export const Cover = styled('div')`
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  background-color: var(--shadow);
  opacity: 1;

  &.open {
    transform: translateY(0%);
    opacity: 1;
    transition: opacity 0.5s;
  }

  &.close {
    transform: translateY(100%);
    opacity: 0;
    transition: opacity 0.5s, transform 0.5s 0.5s;
  }
`

export const PageContainer = styled('div')`
  background: var(--background-dark);
  position: absolute;
  width: 100%;
  height: 85%;
  bottom: 0;
  left: 0;
  z-index: 2;
  box-shadow: 0 2px 40px 0 rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;

  &.open {
    transform: translateY(0%);
    transition: transform .5s;  
  }

  &.close {
    transform: translateY(100%);
    transition: transform .5s;
  }
`

export const Wrapper = styled('div')`
  height: 100%;
  width: 100%;
  max-height: 800px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  padding: 0 20px;

  h2 { 
    margin: 0px 0px 10px 0px;
    font-size: 1.8em;
    font-weight: normal;
  }
`

export const Handle = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10%;
`

export const Button = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`
