
import { styled } from 'goober'

type ContainerProps = {
  fillPercentage: number
}

export const Container = styled('button')<ContainerProps>`
  height: 70px;
  width: 70px;
  background: linear-gradient(to top, blue ${props => props.fillPercentage}%, transparent ${props => props.fillPercentage}%);
  border: 2px solid var(--white);
  border-radius: 50%;
  position: relative;

  ${props => props.disabled && `
    opacity: .5;
    cursor: default;
    background: transparent;
  `};
`
