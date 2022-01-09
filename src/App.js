import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AllPosts from "./components/AllProjects";
import OnePost from "./components/Project";

function App() {
  return (
    <BrowserRouter>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </BrowserRouter>
  );
}
export default App;
