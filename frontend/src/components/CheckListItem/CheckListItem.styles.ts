import { styled } from 'goober'

export const Container = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--grey);
  padding: 10px;
`

export const Name = styled('span')`
  font-size: 1.3em;
`

export const CheckButton = styled('button')`
  width: 36px;
  height: 36px;
  border: 2px solid var(--neon-green);
  border-radius: 5px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  padding: 0;

  svg {
    stroke-width: 4px;
  }

  &.complete {
    background-color: var(--neon-green);
    transition: transform .5s;
  }
`
