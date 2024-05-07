import React, { useState } from "react";
import "./App.css";
import FlexboardContainer from "./components/flexboard"; // Make sure the path is correct

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FlexboardContainer /> {/* Using the extracted Flexboard container */}
      <div className="app-content">{/* Other content of your app */}</div>
    </>
  );
}

export default App;
