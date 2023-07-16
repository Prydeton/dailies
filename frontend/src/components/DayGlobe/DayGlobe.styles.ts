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

    & p {
      opacity: .5;
    }
  `};
`

interface MonthProps {
  disabled?: boolean
}
export const Month = styled('p')<MonthProps>`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.3em;
  color: #bd93f9;
  ${props => props.disabled && `
    opacity: .5;
  `};
`

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
`
