import { Analytics } from "@vercel/analytics/react";
import Portfolio from "./components/Portfolio";
import MouseGlow from "./components/MouseGlow";
import CursorTrail from "./components/CursorTrail";

function App() {
  return (
    <div className="bg-black min-h-screen relative">
      <MouseGlow />
      <CursorTrail />
      <Portfolio />
      <Analytics />
    </div>
  );
}

export default App; 