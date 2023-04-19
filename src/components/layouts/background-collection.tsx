import { useState, useEffect } from "react";
import Image from "next/image";
import { range } from "lodash-es";
import logo from "../../../public/logo.svg";

interface Props {
  /**
   * Number of images to display.
   */
  count: number;
  imageWidth: number;
  imageHeight: number;
  /**
   * Minimum distance between the images.
   */
  minDistance: number;
}

type ImagePosition = { [key: number]: { top: number; left: number } };

export default function BackgroundCollection(props: Props) {
  /**
   * The maximum number of misses before the random placing is stopped.
   */
  const MAX_RETRIES = 100;

  const [imagePositions, setImagePositions] = useState<ImagePosition>({});

  useEffect(() => {
    handleRandomPosition();
  }, [props.count, props.imageWidth, props.imageHeight, props.minDistance]);

  function generateTop() {
    return Math.random() * (window.innerHeight - props.imageHeight);
  }

  function generateLeft() {
    return Math.random() * (window.innerWidth - props.imageWidth);
  }

  function handleRandomPosition() {
    const newImagePositions: ImagePosition = {};
    range(0, props.count).forEach((index) => {
      let top = generateTop();
      let left = generateLeft();

      let retries = 0;
      while (
        checkOverlap(top, left, newImagePositions, props.minDistance) &&
        retries < MAX_RETRIES
      ) {
        top = generateTop();
        left = generateLeft();

        retries++;
      }

      if (retries < MAX_RETRIES) {
        newImagePositions[index] = { top, left };
      }
    });
    setImagePositions(newImagePositions);
  }

  function checkOverlap(
    top: number,
    left: number,
    newImagePositions: ImagePosition,
    minDistance: number
  ) {
    for (const position of Object.values(newImagePositions)) {
      const xOverlap =
        position.left + props.imageWidth + minDistance > left &&
        position.left - minDistance < left + props.imageWidth;
      const yOverlap =
        position.top + props.imageHeight + minDistance > top &&
        position.top - minDistance < top + props.imageHeight;

      if (xOverlap && yOverlap) {
        return true;
      }
    }
    return false;
  }

  if (Object.keys(imagePositions).length === 0) {
    return null;
  }

  return (
    <>
      {range(0, Object.keys(imagePositions).length - 1).map((index) => {
        if (!imagePositions[index]) {
          return null;
        }

        return (
          <Image
            key={index}
            src={logo as string}
            draggable={false}
            style={{
              position: "fixed",
              top: `${imagePositions[index]?.top || 0}px`,
              left: `${imagePositions[index]?.left || 0}px`,
              width: `${props.imageWidth}px`,
              height: `${props.imageHeight}px`,
              opacity: 0.06,
            }}
            alt={`Background image #${index}`}
          />
        );
      })}
    </>
  );
}
