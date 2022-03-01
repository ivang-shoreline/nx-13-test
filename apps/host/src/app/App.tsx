import React from 'react';
import { Widget } from  './Widget';
import { Controller } from './Controller';
import { Sidepanel } from "./Sidepanel";
function App() {
  switch (window.location.pathname) {
    case '/widget': {
      return <Widget/>
    }
    case '/sidepanel': {
      return <Sidepanel/>
    }
    default: {
      return <Controller/>
    }
  }
}

export default App;
