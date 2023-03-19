import React from "react";
import Tournament from "./components/Tournament";
import "./index.css";

function App() {
  return (
    <div className="flex flex-col items-center border font-bold bg-slate-200">
      <h1 className="no-underline text-slate-800 text-4xl py-5">
        March Madness Bracket Simulator
      </h1>
      <Tournament />
    </div>
  );
}

export default App;
