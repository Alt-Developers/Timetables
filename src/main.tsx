import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { MotionConfig } from "framer-motion";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./context/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
