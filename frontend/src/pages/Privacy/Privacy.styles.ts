import { styled } from 'goober'

export const PageContainer = styled('main')`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 3em;
  height: 100%;
  overflow-y: scroll;

  @media screen and (max-width: 450px)  {
    padding: 1.5em;
  }

  & a {
    color: inherit;
  }
`
