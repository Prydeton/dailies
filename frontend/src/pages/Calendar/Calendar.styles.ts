import { styled } from 'goober'

export const PageContainer = styled('main')`
    display: flex;
    flex-direction: column;
    position: relative;
`

export const ControlsWrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const ControlsContainer = styled('div')`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 400px;
`

export const ControlButton = styled('button')`
  border: none;
  width: 35px;
  height: 35px;
  color: var(--white);
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  ${props => props.disabled && `
    opacity: .5;
    cursor: default;
  `};
`

export const ControlMonth = styled('h2')`
  padding: 0;
  margin: 0;
  min-width: 111px;
  display: grid;
  place-content: center;
  letter-spacing: 5px;
`

export const MonthContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, 71px);
  justify-content: space-between;
  gap: 1em;
  padding: 20px;
  overflow-y: scroll;
`
