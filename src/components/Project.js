import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { sanity } from "../client";
import SanityBlockContent from "@sanity/block-content-to-react";

export default function Project() {
  const { slug } = useParams();
  const [open, setOpen] = useState(0);

  const query =
    "*[slug.current == $slug]{title,details,images[]{...,asset->{...,'_key':_id}}}";
  const { data: projectData } = useQuery(`${slug}Query`, () =>
    sanity.fetch(query, { slug })
  );

  if (!projectData) return <pre>getting project data</pre>;
  return (
    <div>
      {projectData.map(({ _id, title, details, images }) => {
        return (
          <>
            <div key={_id}>
              <h3>{title}</h3>
              <p
                onClick={() => setOpen(true)}
                className={`${open ? "hidden" : ""} cursor-pointer`}
              >
                Details
              </p>
              <div
                onClick={() => setOpen(false)}
                className={`${open ? "" : "hidden"} cursor-pointer bg-white`}
              >
                <SanityBlockContent blocks={details} />
              </div>
              {images?.map(image => (
                <img
                  className="w-full py-4"
                  src={image.asset.url}
                  key={image.asset._id}
                />
              ))}
            </div>
          </>
        );
      })}
    </div>
  );
}
