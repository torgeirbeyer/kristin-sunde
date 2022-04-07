import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { sanity } from "../client";

function AllProjects() {
  const query =
    "*[_type == 'project']|order(date desc){slug{current}, title,date}[0]";
  const { data: project } = useQuery("$projectQuery", () =>
    sanity.fetch(query)
  );

  if (!project) return <pre>loading...</pre>;
  const { slug } = project;
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/work/${slug.current}`);
  });
  return (
    <>
      <pre>oooops</pre>
    </>
  );
}

export default AllProjects;
