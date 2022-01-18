/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import SanityBlockContent from "@sanity/block-content-to-react";

const query = "*[_type == 'about'] {title, description, text}";

export default function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(query)
      .then(data => setAboutData(data))
      .catch(console.error);
  }, []);

  return (
    <>
      {aboutData?.map((el, i) => {
        return (
          <div key={i}>
            <h1>{el.title}</h1>
            <SanityBlockContent blocks={el.text} />
          </div>
        );
      })}
    </>
  );
}
