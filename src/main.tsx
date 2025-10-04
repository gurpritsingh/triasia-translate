import React from "react";
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root") as HTMLElement;


import { hydrate, render } from "react-dom";

// const rootElement = document.getElementById("root");
// if (rootElement.hasChildNodes()) {
//   hydrate(<App />, rootElement);
// } else {
//   render(<App />, rootElement);
// }
// For standard SPA
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const hydrateRoot = ReactDOM.hydrateRoot;
if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}