import React from "react";
import PropTypes from "prop-types";

const Video = props => {
  const { url, video } = props.video;
  return (
    <div key={video._id} className={"block relative my-8"}>
      <div aria-hidden="true" className={"w-full"}>
        <video
          autoPlay={true}
          // playsInline
          preload="auto"
          loop
          // controls={true}
          muted
          className=""
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

Video.propTypes = {
  video: PropTypes.object,
  url: PropTypes.string,
  lazy: PropTypes.string,
};

export default Video;
