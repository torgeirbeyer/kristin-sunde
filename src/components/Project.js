import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { sanity } from "../client";
import SanityBlockContent from "@sanity/block-content-to-react";
import Image from "./Image";

export default function Project() {
  const { slug } = useParams();
  const [open, setOpen] = useState(0);

  const query = `*[_type == 'project' && slug.current == $slug]{
    title,
    details[],
    images[]{
      _type == 'projectImage' => {
      'image': @.asset->,
      'url': @.asset->url,
      'lqip': @.asset->metadata.lqip,
      'aspectRatio': @.asset->metadata.dimensions.aspectRatio
      }
    }
  }`;
  const { data: projectData } = useQuery(`${slug}Query`, () =>
    sanity.fetch(query, { slug })
  );

  if (!projectData) return <pre>getting project data</pre>;
  const { _id, title, details, images } = projectData[0];
  return (
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
        <div key={image._id}>
          <Image image={image} />
        </div>
        // <img
        //   className="w-full py-4"
        //   src={image.asset.url}
        //   key={image.asset._id}
        // />
      ))}
    </div>
  );
}
