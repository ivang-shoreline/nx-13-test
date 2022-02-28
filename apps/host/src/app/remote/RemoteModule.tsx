import styled from '@emotion/styled';
import NxWelcome from './nx-welcome';

const StyledApp = styled.div`
  // Your style here
`;

export function App(props: object) {

  console.log(props)

  return (
    <StyledApp>
      <NxWelcome title="host" />
    </StyledApp>
  );
}

export default App;
