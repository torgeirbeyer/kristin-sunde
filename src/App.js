import React, { useState, useEffect } from "react";
import sanityClient from "./client";
import { Link, Outlet, useLocation } from "react-router-dom";
import SanityBlockContent from "@sanity/block-content-to-react";

function App() {
  const [fastPitch, setFastPitch] = useState(null);
  const query = "*[_type == 'about'] {description}";

  useEffect(() => {
    sanityClient
      .fetch(query)
      .then(data => setFastPitch(data))
      .catch(console.error);
  }, []);

  const { description } = fastPitch ? fastPitch[0] : [];

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <div className="bg-eggwhite h-screen">
      <div className="container mx-auto">
        <div className="flex flex-row flex-wrap pb-4">
          <aside className="w-full h-screen sm:w-1/3 md:w-1/4 border-black border-r px-2">
            <div className="sticky top-0 p-4 w-full">
              <nav className="flex flex-row justify-between sm:flex-col overflow-hidden">
                <Link className="hover:bg-green" to="/">
                  KRISTIN SUNDE
                </Link>
                <Link
                  className={`hover:bg-green ${
                    splitLocation[1] === "information" ? "bg-green" : ""
                  }`}
                  to="information"
                >
                  INFORMATION
                </Link>
                <Link
                  className={`hover:bg-green ${
                    splitLocation[1] === "work" ? "bg-green" : ""
                  }`}
                  to="work"
                >
                  WORK
                </Link>
              </nav>
              {splitLocation[1] === "information" && description && (
                <SanityBlockContent
                  className="pt-16 overflow-hidden"
                  blocks={description}
                />
              )}
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
