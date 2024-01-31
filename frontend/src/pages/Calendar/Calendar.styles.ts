import { styled } from 'goober'

export const PageContainer = styled('main')`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
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

export const MonthWrapper = styled('div')`
  margin-top: 1em;
  display: flex;
  justify-content: center;
`

export const MonthContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: space-between;
  gap: .8em;
  padding: 10px;
  max-height: calc(100vh - 95px - 82px);
  overflow-y: scroll;
  max-width: 800px;
`

export const ControlYear = styled('span')`
  text-align: center;
`

export const DayLabel = styled('p')`
  text-align: center;
  font-weight: bold;
  margin: 0;
  width: 100%;
`

export const WFHContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
