import { styled } from 'goober'

export const PageContainer = styled('main')`
  display: flex;
  flex-direction: column;
  position: relative;
`

export const ControlsWrapper = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ControlsContainer = styled('div')`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px 5px 20px;
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
  min-width: 180px;
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
  max-height: calc(100vh - 95px - 82px);
  overflow-y: scroll;
`

export const ControlYear = styled('span')`
  text-align: center;
`
