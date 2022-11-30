import React, { useState } from "react";

const App: React.FC = () => {
  const [greeting, setGreeting] = useState("hello");
  console.log("outside func", greeting);

  const handleClick = () => {
    if (greeting !== "hello") {
      setGreeting("hello");
      return;
    }
    setGreeting("goodbye");
  };
  return <button onClick={() => handleClick()}>{greeting}</button>;
};

export default App;
