import React, {FC, useEffect, useState} from "react";

function loadComponent(scope: string, module: string) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    // @ts-ignore
    await __webpack_init_sharing__("default");
    // @ts-ignore
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);
    // @ts-ignore
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

const urlCache = new Set();
function useDynamicScript(url: string) {
  const [ready, setReady] = React.useState(false);
  const [errorLoading, setErrorLoading] = React.useState(false);

  React.useEffect(() => {
    if (!url) return;

    if (urlCache.has(url)) {
      setReady(true);
      setErrorLoading(false);
      return;
    }

    setReady(false);
    setErrorLoading(false);
    const element = document.createElement('script');

    setTimeout(() => {

      element.src = url;
      element.type = 'text/javascript';
      element.async = true;

      element.onload = () => {
        urlCache.add(url);
        setReady(true);
      };

      element.onerror = () => {
        setReady(false);
        setErrorLoading(true);
      };

      document.head.appendChild(element);
    }, 0)



    return () => {
      urlCache.delete(url);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    errorLoading,
    ready,
  };
};

const componentCache = new Map();

export type UseFederatedComponentParams = {
  remoteUrl: string;
  scope: string;
  module: string
}

export function useFederatedComponent<TComponentProps> ({remoteUrl, scope, module}: UseFederatedComponentParams) {
  const key = `${remoteUrl}-${scope}-${module}`;
  const [Component, setComponent] = React.useState<React.LazyExoticComponent<FC<TComponentProps>>>();

  const { ready, errorLoading } = useDynamicScript(remoteUrl);
  React.useEffect(() => {
    if (Component) setComponent(undefined);
    // Only recalculate when key changes
  }, [key]);

  React.useEffect(() => {
    if (ready && !Component) {
      const Comp = React.lazy<FC<TComponentProps>>(loadComponent(scope, module));
      componentCache.set(key, Comp);
      // @ts-ignore
      setComponent(Comp);
    }
    // key includes all dependencies (scope/module)
  }, [Component, ready, key]);

  return { errorLoading, Component };
};
