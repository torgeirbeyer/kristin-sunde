import React from "react";
import { useQuery } from "react-query";
import { sanity } from "../client";
import { Link, Outlet, useLocation } from "react-router-dom";
import SanityBlockContent from "@sanity/block-content-to-react";

const aboutQuery = "*[_type == 'about'] {description}";
const projectQuery =
  "*[_type == 'category']{_id, title, 'projects': *[_type == 'project' && references(^._id)]{title,slug,_id}}";

function App() {
  const { data: description } = useQuery("fastPitch", () =>
    sanity.fetch(aboutQuery)
  );

  const { data: projectList } = useQuery("projectList", () =>
    sanity.fetch(projectQuery)
  );

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  if (!description && !projectList) return <p>Loading...</p>;
  return (
    <div className="bg-eggwhite h-screen">
      <div className="container mx-auto">
        <div className="flex flex-row flex-wrap pb-4">
          <aside className="w-full sm:h-screen sm:w-1/3 md:w-1/4 border-black border-b sm:border-b-0 sm:border-r px-2">
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
              {splitLocation[1] === "information" &&
                description?.map((el, i) => (
                  <div key={i} className="pt-4 sm:pt-16 overflow-hidden">
                    <SanityBlockContent blocks={el.description} />
                  </div>
                ))}

              {projectList && (
                <div className="pt-4 sm:pt-16 overflow-hidden">
                  {splitLocation[1] === "work" &&
                    projectList &&
                    projectList.map(({ _id, title, projects }) => (
                      <>
                        <h3 className="font-bold" key={_id}>
                          {title}
                        </h3>
                        {projects.map(project => {
                          return (
                            <Link
                              key={project._id}
                              to={`work/${project.slug.current}`}
                            >
                              {project.title}
                            </Link>
                          );
                        })}
                      </>
                    ))}
                </div>
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
