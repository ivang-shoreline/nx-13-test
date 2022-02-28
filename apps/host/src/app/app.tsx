import React from 'react';
import { useFederatedComponent } from './useFederatedComponent';

function App() {
  // const [{ module, scope, url }, setSystem] = React.useState({});
  const url = 'http://b2e5-93-159-241-152.ngrok.io/remoteEntry.js';
  const scope = 'remoteModule';
  const module = './RemoteModule';
  // function setApp2() {
  //   setSystem({
  //     url: 'http://dec3-93-159-241-152.ngrok.io/remoteEntry.js',
  //     scope: 'app1',
  //     module: './Widget',
  //   });
  // }

  // function setApp3() {
  //   setSystem({
  //     url: 'http://localhost:3003/remoteEntry.js',
  //     scope: 'app3',
  //     module: './Widget',
  //   });
  // }

  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(url, scope, module);

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <h1>Dynamic System Host</h1>
      <h2>App 1</h2>
      <p>
        The Dynamic System will take advantage Module Federation <strong>remotes</strong> and{' '}
        <strong>exposes</strong>. It will no load components that have been loaded already.
      </p>
      {/*<button onClick={setApp2}>Load App 2 Widget</button>*/}
      {/*<button onClick={setApp3}>Load App 3 Widget</button>*/}
      <div style={{ marginTop: '2em' }}>
        <React.Suspense fallback="Loading System">
          {errorLoading
            ? `Error loading module "${module}"`
            : FederatedComponent &&
            // @ts-ignore
            <FederatedComponent />
          }
        </React.Suspense>
      </div>
    </div>
  );
}

export default App;
