import { keyframes, styled } from 'goober'

const spin = keyframes`
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
`

export const Ring = styled('div')`
  height: 1em;
  min-height: 1em;
  width: 1em;
  min-width: 1em;
  box-sizing: border-box;
  border-radius: 100vmax;
  border: .125em solid black;
  border-bottom-color: transparent;
  animation: ${spin} 0.8s linear infinite;
`

export const Center = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  flex: 1;
`
