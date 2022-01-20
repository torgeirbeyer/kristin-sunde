/* eslint-disable no-unused-vars */
import React from "react";
import { useQuery } from "react-query";
import { sanity } from "../client";
import BlockContent from "@sanity/block-content-to-react";

const query = "*[_type == 'about'] {text[]{...,asset->{...,'_key': _id}}}";

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
            <BlockContent blocks={el.text} />
          </div>
        );
      })}
    </>
  );
}
