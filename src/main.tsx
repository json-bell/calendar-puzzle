import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/globalCssVariables.css";
import App from "./App.tsx";
import CSSVarProvider from "./global/CSSVarProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CSSVarProvider>
      <App />
    </CSSVarProvider>
  </StrictMode>
);
