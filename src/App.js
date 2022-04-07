import React from "react";
import { useQuery } from "react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { sanity } from "./client";
import Home from "./components/Home";
import PageLayout from "./components/PageLayout";
import About from "./components/About";
import Project from "./components/Project";
import NotFound from "./components/NotFound";

function App() {
  const query =
    "*[_type == 'project']|order(date desc){slug{current}, title,date}[0]";
  const { data: project } = useQuery("$projectQuery", () =>
    sanity.fetch(query)
  );
  if (!project) return <pre>wait a second</pre>;
  const { slug } = project;
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/" element={<PageLayout />}>
        <Route path="information" element={<About />} />
        <Route path="work" element={<Navigate replace to={slug.current} />} />
        <Route path="work/:slug" element={<Project />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
