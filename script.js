import React from 'https://esm.sh/react';
import ReactDOM from 'https://esm.sh/react-dom/client';
import { motion } from 'https://esm.sh/framer-motion';

const imageCount = 33;
const isMobileViewport = window.matchMedia('(max-width: 640px)').matches;
const imageGrid = document.getElementById('image-grid');
const shuffle = (items) => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
};this

const randomBetween = (min, max) => Math.random() * (max - min) + min;
let topZIndex = 200;
const activeDragZIndex = 10000;
const dragScale = isMobileViewport ? 2.5 : 1.75;
const horizontalRange = isMobileViewport
  ? { min: 6, max: 58 }
  : { min: 0, max: 82 };
const verticalRange = isMobileViewport
  ? { min: -8, max: 128 }
  : { min: 0, max: 128 };

const images = shuffle(Array.from({ length: imageCount }, (_, index) => index + 1));

const DraggableImage = ({ imageIndex }) => {
  const layout = React.useMemo(
    () => ({
      left: randomBetween(horizontalRange.min, horizontalRange.max).toFixed(2),
      top: randomBetween(verticalRange.min, verticalRange.max).toFixed(2),
      rotation: randomBetween(-16, 16),
      offsetX: randomBetween(-12, 12),
      offsetY: randomBetween(-12, 12),
      baseZIndex: Math.floor(randomBetween(8, 26)),
    }),
    []
  );
  const [zIndex, setZIndex] = React.useState(
    layout.baseZIndex
  );

  return React.createElement(
    motion.div,
    {
      className: 'image-item',
      key: imageIndex,
      drag: true,
      dragMomentum: false,
      initial: {
        x: layout.offsetX,
        y: layout.offsetY,
        rotate: layout.rotation,
      },
      whileDrag: {
        scale: dragScale,
        rotate: 0,
        zIndex: activeDragZIndex,
      },
      style: {
        left: `${layout.left}%`,
        top: `${layout.top}%`,
        zIndex,
      },
      onPointerDown: () => {
        topZIndex += 1;
        setZIndex(topZIndex);
      },
    },
    React.createElement('img', {
      className: 'grid-image',
      src: `img/${imageIndex}.png`,
      alt: `Image ${imageIndex}`,
      draggable: false,
    })
  );
};

const imageItems = images.map((imageIndex) =>
  React.createElement(DraggableImage, {
    imageIndex,
    key: imageIndex,
  })
);

const root = ReactDOM.createRoot(imageGrid);
root.render(React.createElement(React.Fragment, null, imageItems));
