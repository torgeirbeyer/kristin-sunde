import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { sanity } from "../client";

const query = "*[_type == 'homepage']{backgroundVideo{asset->}}";

function Home() {
  const { data: homepage } = useQuery("homePageQuery", () =>
    sanity.fetch(query)
  );
  if (!homepage) return <p>loading...</p>;

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      <div className="container-xl sm:ml-2 sm:mt-2 sticky top-0 p-4 w-full sm:w-1/3 md:w-1/4 z-30">
        <nav className="flex flex-row justify-between sm:flex-col ">
          <Link className="bg-white text-darkGreen" to="/">
            KRISTIN SUNDE
          </Link>
          <Link
            className="hover:bg-transparent bg-white text-darkGreen"
            to="/information"
          >
            INFORMATION
          </Link>
          <Link
            className="hover:bg-transparent bg-white text-darkGreen"
            to="/work"
          >
            WORK
          </Link>
        </nav>
      </div>
      {homepage.map(({ backgroundVideo }) => (
        <video
          key={backgroundVideo.asset._id}
          autoPlay={true}
          // playsInline
          preload="auto"
          loop
          // controls={true}
          muted
          className="absolute z-10 w-auto min-w-full min-h-full max-w-none top-50 left-50 transform -translate-x-2/4 -translate-y-2/4"
        >
          <source src={backgroundVideo.asset.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}
    </div>
  );
}

export default Home;
