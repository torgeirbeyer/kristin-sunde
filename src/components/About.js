/* eslint-disable no-unused-vars */
import React from "react";
import { useQuery } from "react-query";
import { sanity } from "../client";
import BlockContent from "@sanity/block-content-to-react";

const query = "*[_type == 'about'] {title, description, text}";

export default function About() {
  const { data: aboutData } = useQuery("aboutPageQery", () =>
    sanity.fetch(query)
  );
  if (!aboutData) return <p>Loading...</p>;

  return (
    <>
      {aboutData?.map((el, i) => {
        return (
          <div key={i}>
            <h1>{el.title}</h1>
            <BlockContent blocks={el.text} />
          </div>
        );
      })}
    </>
  );
}
