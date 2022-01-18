import React from "react";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="bg-eggwhite h-screen">
      <div className="container mx-auto">
        <div className="flex flex-row flex-wrap py-4">
          <aside className="w-full sm:w-1/3 md:w-1/4 px-2">
            <div className="sticky top-0 p-4 w-full">
              <nav className="flex flex-row justify-between sm:flex-col overflow-hidden">
                <Link to="/">home</Link>
                <Link to="about">about</Link>
                <Link to="projects">projects</Link>
              </nav>
            </div>
          </aside>
          <main role="main" className="w-full sm:w-2/3 md:w-3/4 px-2">
            <div className="content p-4">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <footer className="mt-auto"></footer>
    </div>
  );
}
export default App;
