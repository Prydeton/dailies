import { styled } from 'goober'

export const GlobeWrapper = styled('button')`
  aspect-ratio: 1/1;
  max-height: 80px;
  max-width: 80px;
  border: 2px solid var(--white);
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  padding: 0;
  background-color: transparent;

  ${props => props.disabled && `
    opacity: .5;
    cursor: default;
    background: transparent;

    & p {
      opacity: .5;
    }
  `};
`

export const Day = styled('p')`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  font-size: .9em;
  color: #bd93f9;
  font-weight: bold;

  @media screen and (min-width: 450px)  {
    font-size: 1.5em;
  }
`

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
`
