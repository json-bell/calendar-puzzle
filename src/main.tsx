import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CSSVarProvider from "./global/CSSVarProvider.tsx";
import { ViewportProvider } from "./utils/useWindowSize/windowSizeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ViewportProvider>
      <CSSVarProvider>
        <App />
      </CSSVarProvider>
    </ViewportProvider>
  </StrictMode>
);
