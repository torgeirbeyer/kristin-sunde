import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AllPosts from "./components/AllProjects";
import OnePost from "./components/Project";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route component={AllPosts} path="/" exact />
        <Route component={OnePost} path="/:slug" />
      </div>
    </BrowserRouter>
  );
}
export default App;
