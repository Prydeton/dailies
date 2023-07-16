import { styled } from 'goober'

export const PageContainer = styled('main')`
  flex: .6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 2em;
`

export const FormWrapper = styled('div')`
  width: 20em;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
`

export const Title = styled('h1')`
  font-weight: bold;
`

export const Error = styled('span')`
  color: var(--red);
`

export const PrivacyPolicy = styled('span')`
  opacity: 0.6;
  margin-top: 2em;

  & a {
    text-decoration: underline;
    color: inherit;
  }
`
