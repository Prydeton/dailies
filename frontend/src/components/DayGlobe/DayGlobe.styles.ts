import { styled } from 'goober'

export const GlobeWrapper = styled('button')`
  height: 70px;
  width: 70px;
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
  `};
`

export const Month = styled('p')`
  text-align: center;
`

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
`
