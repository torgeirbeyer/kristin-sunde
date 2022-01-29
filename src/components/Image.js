import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { urlFor } from "../client";
import { useInView } from "react-intersection-observer";

import { get } from "lodash";

const DEFAULT_WIDTH = 800;
const DEFAULT_WIDTHS = [320, 480, 640, 800, 1440];
const DEFAULT_SIZES =
  "(max-width: 320px) 280px, (max-width: 480px) 440px, 800px";

const Image = props => {
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

  const {
    image,
    aspectRatio,
    lqip,
    url,
    width = DEFAULT_WIDTH,
    fit = "clip",
    sizes = DEFAULT_SIZES,
    widths = DEFAULT_WIDTHS,
    lazy = "true",
  } = props.image;

  const showImage = lazy === "false" || !!inView;
  const orgWidth = get(image, "metadata.dimensions.width");
  const orgHeight = get(image, "metadata.dimensions.height");
  const aspect = aspectRatio || orgWidth / orgHeight || null;
  const defaultSrcSetParts = aspect
    ? widths.map(
        sourceW =>
          `${urlFor(image)
            .width(sourceW)
            .height(Math.round(sourceW / aspectRatio))
            .fit(fit)
            .url()} ${sourceW}w`
      )
    : widths.map(
        sourceW => `${urlFor(image).width(sourceW).url()} ${sourceW}w`
      );
  const defaultSrcSet = defaultSrcSetParts.join(",");
  const height = aspectRatio ? Math.round(width / aspectRatio) : null;

  const computedSrc = urlFor(image).width(width).height(height).fit(fit).url();
  const bg = get(image, "metadata.palette.dominant.background");

  return (
    <div
      className={`block relative my-8 ${isLoaded ? "opacity-1" : ""}`}
      data-has-aspect={!!aspectRatio}
      style={{
        paddingBottom: aspectRatio ? `${100 / aspectRatio}%` : undefined,
      }}
    >
      <div
        ref={inViewRef}
        data-is-loaded={isLoaded}
        aria-hidden="true"
        className={`w-full transform transition-opacity duration-500 ease-out ${
          aspectRatio ? "block absolute top-0 left-0 h-full z-0" : ""
        } ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{
          imageRendering: "pixelated",
          backgroundColor: !isLoaded && bg,
          backgroundImage: !isLoaded && lqip && `url(${lqip})`,
          backgroundSize: "100% 100%",
        }}
      >
        <img
          className={`block w-full ${
            aspectRatio ? "absolute opacity-100 top-0 left-0 h-full z-1" : ""
          }`}
          style={{ imageRendering: "auto", opacity: isLoaded ? 1 : 0 }}
          ref={imgRef}
          srcSet={showImage && !url ? defaultSrcSet : undefined}
          sizes={sizes}
          src={showImage ? url || computedSrc : undefined}
          width={width}
          height={height}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
};

Image.propTypes = {
  image: PropTypes.object,
  aspectRatio: PropTypes.number,
  lqip: PropTypes.string,
  url: PropTypes.string,
  width: PropTypes.number,
  fit: PropTypes.string,
  sizes: PropTypes.string,
  widths: PropTypes.arrayOf(PropTypes.number),
  lazy: PropTypes.string,
};

export default Image;
