import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StitchDesign } from "./screens/StitchDesign";
import { Help } from "./screens/Help";
import { Landing } from "./screens/Landing";


createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<StitchDesign />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
