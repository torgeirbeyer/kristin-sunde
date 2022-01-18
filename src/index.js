import React from "react";
import "./index.css";
import { render } from "react-dom";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllProjects from "./components/AllProjects";
import Project from "./components/Project";
import About from "./components/About";
import Home from "./components/Home";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<AllProjects />}>
          <Route path=":slug" element={<Project />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
