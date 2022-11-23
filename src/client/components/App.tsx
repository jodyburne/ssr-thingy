import React, { useState } from "react";

const App: React.FC = () => {
  const [greeting, setGreeting] = useState("hello");
  console.log("outside func", greeting);

  const handleClick = () => {
    console.log("inside func");
    setGreeting("goodbye");
  };
  return <button onClick={() => handleClick()}>{greeting}</button>;
};

export default App;
