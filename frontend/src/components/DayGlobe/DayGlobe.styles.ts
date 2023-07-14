
import { styled } from 'goober'

type GlobeWrapperProps = {
  fillPercentage: number
}

export const GlobeWrapper = styled('button')<GlobeWrapperProps>`
  height: 70px;
  width: 70px;
  background: linear-gradient(to top, var(--neon-green) ${props => props.fillPercentage}%, transparent ${props => props.fillPercentage}%);
  border: 2px solid var(--white);
  border-radius: 50%;
  position: relative;

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


