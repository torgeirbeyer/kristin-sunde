import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PageLayout from "./components/PageLayout";
import About from "./components/About";
import AllProjects from "./components/AllProjects";
import Project from "./components/Project";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/" element={<PageLayout />}>
        <Route path="information" element={<About />} />
        <Route path="work" element={<AllProjects />}>
          <Route path=":slug" element={<Project />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
