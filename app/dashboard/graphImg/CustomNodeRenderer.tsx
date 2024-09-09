export const customNodeRenderer = (context, node, settings) => {
  const { x, y, size, image } = node;

  const img = new Image();
  img.src = image;
  img.onload = () => {
    context.drawImage(img, x - size / 2, y - size / 2, size, size);
  };
};
