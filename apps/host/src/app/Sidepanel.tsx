import {
  init,
} from '@datadog/ui-extensions-sdk';
import { useFederatedComponent } from "./useDynamicScript";
import React from "react";


export function Sidepanel(){

  React.useEffect(() => {
    init();
  }, [])

  const url = 'https://aaf1-93-159-241-152.ngrok.io/remoteEntry.js';
  const scope = 'remoteModule';
  const module = './RemoteSidepanelModule';

  const { Component: FederatedComponent, errorLoading } = useFederatedComponent({remoteUrl: url, scope, module})

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      this is sidepanel
      <React.Suspense fallback="Loading remote module">
        {errorLoading
          ? `Error loading module "${module}"`
          : FederatedComponent &&
          // @ts-ignore
          <FederatedComponent />
        }
      </React.Suspense>
    </div>
  )
}
