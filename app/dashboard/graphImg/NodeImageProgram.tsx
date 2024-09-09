// src/common/CustomNodeRenderer.js
import { NodeProgram } from 'sigma/rendering';

export default class ImageNodeProgram extends NodeProgram {
  constructor(context) {
    super(context);

    // Add custom shaders or settings if needed
  }

  render(node, settings) {
    const ctx = this.context;
    const { x, y, size, image } = node;

    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
      };
    }
  }

  getDefinition() {
    return {
      // Define your custom node program details here
      vertexShader: `
        precision highp float;
        attribute vec2 a_position;
        attribute vec2 a_size;
        uniform vec2 u_resolution;
        void main() {
          vec2 position = (a_position / u_resolution) * 2.0 - 1.0;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform sampler2D u_image;
        void main() {
          gl_FragColor = texture2D(u_image, gl_FragCoord.xy);
        }
      `,
    };
  }
}
