import React from "react";
import Lottie from "react-lottie";
import animationData from "/public/assets/animations/404-page-not-found-animation-lottie.json";

export default function Animation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData as never,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} />;
}
