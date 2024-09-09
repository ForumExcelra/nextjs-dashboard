// src/utils/customNodeShape.js

import sigma from 'sigma';

export const registerCustomNodeShape = (sigmaInstance, shapeName) => {
  // Check if sigma.plugins already has a node renderer
  if (!sigma.canvas.nodes[shapeName]) {
    sigma.canvas.nodes[shapeName] = (node, context, settings) => {
      const prefix = settings('prefix') || '';
      const size = node[prefix + 'size'];
      const x = node[prefix + 'x'];
      const y = node[prefix + 'y'];
      const img = new Image();

      img.src = node.image;
      img.onload = () => {
        context.save();
        context.beginPath();
        context.arc(x, y, size, 0, 2 * Math.PI, true);
        context.clip();
        context.drawImage(img, x - size, y - size, size * 2, size * 2);
        context.restore();
      };
    };
  }
};
