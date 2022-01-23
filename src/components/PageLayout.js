import React from "react";
import { useQuery } from "react-query";
import { sanity } from "../client";
import { Link, Outlet, useLocation } from "react-router-dom";
import SanityBlockContent from "@sanity/block-content-to-react";

const aboutQuery = "*[_type == 'about'] {description}";
const projectQuery =
  "*[_type == 'category']{_id, title, 'projects': *[_type == 'project' && references(^._id)] | order(date desc) {title,slug,_id}}";

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
  console.log(projectList);

  if (!description && !projectList) return <p>Loading...</p>;
  return (
    <div className="bg-eggwhite min-h-screen">
      <div className="container-xl mx-auto">
        <div className="flex flex-row flex-wrap">
          <aside className="w-full sm:min-h-screen sm:w-1/3 md:w-1/4 border-gray-300 border-b sm:border-b-0 sm:border-r px-2">
            <div className="sticky top-0 p-4 w-full">
              <nav className="flex flex-row justify-between sm:flex-col overflow-hidden">
                <Link className="hover:bg-white text-darkGreen" to="/">
                  KRISTIN SUNDE
                </Link>
                <Link
                  className={`hover:bg-white text-darkGreen ${
                    splitLocation[1] === "information" ? "bg-white" : ""
                  }`}
                  to="information"
                >
                  INFORMATION
                </Link>
                <Link
                  className={`hover:bg-white text-darkGreen ${
                    splitLocation[1] === "work" ? "bg-white" : ""
                  }`}
                  to="work"
                >
                  WORK
                </Link>
              </nav>
              {splitLocation[1] === "information" &&
                description?.map((el, i) => (
                  <div key={i} className="pt-4 sm:pt-64 overflow-hidden">
                    <SanityBlockContent blocks={el.description} />
                  </div>
                ))}

              {projectList && (
                <div className="pt-4 sm:pt-64 overflow-hidden">
                  {splitLocation[1] === "work" &&
                    projectList &&
                    projectList.map(({ _id, title, projects }) => (
                      <>
                        <div className="mb-4">
                          <h3 className="font-bold uppercase" key={_id}>
                            {title}
                          </h3>
                          <ul>
                            {projects.map(project => (
                              <li
                                className={`pb-0.5 ${
                                  splitLocation[2] === project.slug.current
                                    ? "bg-white"
                                    : ""
                                }`}
                                key={project._id}
                              >
                                <Link to={`work/${project.slug.current}`}>
                                  {project.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
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
