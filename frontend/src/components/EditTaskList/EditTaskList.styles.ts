import { forwardRef } from 'react'
import { styled } from 'goober'

export const Container = styled('div')`

`

export const List = styled('div')`
  & > div {
    min-width: fit-content;
  }
`

export const Row = styled('div', forwardRef)`
  margin-block: 3px;
  display: grid;
  align-items: center;
  padding-inline: 5px;
  grid-template-columns: 1fr 6fr 1fr;
  gap: 5px;

  & > svg {
    flex-shrink: 0;
  }
`

export const Label = styled('span')`
  flex: 1;
  min-width: 100px;
  span {
    display: block;
  }
`

export const ColumnLabel = styled('label')`
  flex: 1;
  font-size: var(--font-size-tiny);
  text-transform: uppercase;
  opacity: .75;
  font-weight: 600;
  letter-spacing: .1em;
`

export const DragHandleWrapper = styled('div')`
  padding: .45em;
  cursor: grab;
  touch-action: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);

  &:active {
    cursor: grabbing;
  }
`

export const TextInput = styled('input')`
  background-color: transparent;
  color: var(--white);
  padding: 5px;
  border: 1px solid var(--purple);
  border-radius: 5px;
  outline: none;

  &:focus {
    border: 2px solid var(--purple);
  }
`

export const DeleteButton = styled('button')`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
`

export const AddTaskButton = styled('button')`
  background-color: var();
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
`

export const ButtonContainer = styled('div')`
  display: flex;
  gap: 20px;
`
