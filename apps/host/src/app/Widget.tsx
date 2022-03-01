import {
  init,
} from '@datadog/ui-extensions-sdk';
import { useFederatedComponent } from "./useDynamicScript";
import React from "react";
import {DDClient} from "@datadog/ui-extensions-sdk/dist/client/client";

let client: DDClient;
client = init();

export function Widget(){


  React.useEffect(() => {
    console.log("init")
  }, [])

  const url = 'https://982b-93-159-241-152.ngrok.io/remoteEntry.js';
  const scope = 'remoteModule';
  const module = './RemoteWidgetModule';

  const { Component: FederatedComponent, errorLoading } = useFederatedComponent({remoteUrl: url, scope, module})
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      this is widget
      <button onClick={() => {
        client.sidePanel.open(
          {
            source: 'sidepanel',
            key: 'custom-side-panel',
            title: 'FME side panel'
          },
        );
      }}>
        open sipe panel
      </button>
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
