/// <reference types="vite/client" />
/// <reference types="react/experimental" />
/// <reference types="react-dom/experimental" />

import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom";

function App() {
  return (
    <div>
      Hello
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  </StrictMode>
);
