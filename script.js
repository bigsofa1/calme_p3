import React from 'https://esm.sh/react';
import ReactDOM from 'https://esm.sh/react-dom/client';
import { motion } from 'https://esm.sh/framer-motion';

const imageCount = 33;
const imageGrid = document.getElementById('image-grid');
const images = Array.from({ length: imageCount }, (_, index) => index + 1);

const imageItems = images.map((imageIndex) => {
  const fromLeft = imageIndex % 2 === 1;
  const isRightColumn = !fromLeft;
  return React.createElement(
    'div',
    {
      className: 'col-6',
      key: imageIndex,
      style: isRightColumn ? { marginTop: '10rem' } : undefined,
    },
    React.createElement(motion.img, {
      className: 'grid-image',
      src: `img/${imageIndex}.jpg`,
      alt: `Image ${imageIndex}`,
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: false, amount: 0.3 },
      transition: { duration: 0.6, ease: 'easeOut' },
    })
  );
});

const root = ReactDOM.createRoot(imageGrid);
root.render(React.createElement(React.Fragment, null, imageItems));