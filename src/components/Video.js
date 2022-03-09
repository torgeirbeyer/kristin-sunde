import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useInView } from "react-intersection-observer";

const Video = props => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  const [isLoaded, setLoaded] = useState(0);

  const imgRef = React.createRef();
  useEffect(() => {
    if (
      imgRef &&
      imgRef.current &&
      imgRef.current.complete &&
      imgRef.current.naturalWidth
    ) {
      setLoaded(true);
    }
  });

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
