import { styled } from 'goober'

export const StyledButton = styled('button')`
  padding: .6em 1em;
  border-style: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  font: inherit;
  color: var(--background-dark);
  background-color: var(--white);
  cursor: pointer;

  &:hover:not(.disabled), &:focus-visible {
    opacity: .85;
  }

  &.primary {
    background-color: var(--neon-green);
    color: var(--background-dark);
  }

  &.secondary {
    background-color: var(--grey);
    color: var(--white);
  }

  &.danger {
    background-color: var(--red);
    color: var(--white);
  }

  &.disabled{
    opacity: .5;
    cursor: default;
  }

  &.fullWidth {
    width: 100%;
  }

  &.transparent {
    color: var(--white);
    background-color: transparent;
  }
`

export const SocialIcon = styled('img')`
  height: 32px;
  width: 32px;
`
