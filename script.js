import React from 'https://esm.sh/react';
import ReactDOM from 'https://esm.sh/react-dom/client';
import { motion } from 'https://esm.sh/framer-motion';

const imageCount = 33;
const imageGrid = document.getElementById('image-grid');
const shuffle = (items) => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
};

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const images = shuffle(Array.from({ length: imageCount }, (_, index) => index + 1));

const imageItems = images.map((imageIndex) => {
  const left = randomBetween(0, 82).toFixed(2);
  const top = randomBetween(0, 128).toFixed(2);
  const rotation = randomBetween(-16, 16).toFixed(2);
  const offsetX = randomBetween(-0.75, 0.75).toFixed(2);
  const offsetY = randomBetween(-0.75, 0.75).toFixed(2);
  const zIndex = Math.floor(randomBetween(8, 26));
  return React.createElement(
    'div',
    {
      className: 'image-item',
      key: imageIndex,
      style: {
        left: `${left}%`,
        top: `${top}%`,
        transform: `translate(${offsetX}rem, ${offsetY}rem) rotate(${rotation}deg)`,
        zIndex,
      },
    },
    React.createElement(motion.img, {
      className: 'grid-image',
      src: `img/${imageIndex}.png`,
      alt: `Image ${imageIndex}`,
      drag: true,
      dragMomentum: false,
      whileDrag: { scale: 1.02, zIndex: 40 },
    })
  );
});

const root = ReactDOM.createRoot(imageGrid);
root.render(React.createElement(React.Fragment, null, imageItems));
