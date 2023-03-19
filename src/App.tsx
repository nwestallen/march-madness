import React from "react";
import Tournament from "./components/Tournament";
import "./index.css";

function App() {
  return (
    <div className="text-xl font-bold underline">
      <h1>March Madness Bracket Generator</h1>
      <Tournament />
    </div>
  );
}

export default App;
