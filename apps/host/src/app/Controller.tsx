import { init } from '@datadog/ui-extensions-sdk';
import React from "react";

export function Controller() {
  React.useEffect(() => {
    init();
  }, [])

  const root = document.getElementById('root');
  if (!root) {
    return null;
  }
  root.innerHTML = `
    <div>
      The application controller is running in the background.
    </div>
  `;
  return null;
}
