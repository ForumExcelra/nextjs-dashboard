'use client';
import { useEffect, useState, useRef } from 'react';
import { useLoadGraph, useSigma } from '@react-sigma/core';
import { MultiDirectedGraph as MultiGraphConstructor } from 'graphology';
import { NodeImageProgram, NodePictogramProgram } from '@sigma/node-image';
import Sigma from 'sigma';
import { EdgeArrowProgram, NodeProgram } from 'sigma/rendering';

class CustomNodeRenderer {
  constructor(sigmaInstance, settings) {
    this.sigma = sigmaInstance;
    this.settings = settings;
  }

  drawNode(node) {
    const ctx = this.sigma.renderers[0].context;
    const { x, y, size, image } = node;

    const img = new Image();
    img.src = image;

    img.onload = () => {
      ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
    };
  }

  draw() {
    this.sigma.graph.nodes().forEach((nodeId) => {
      const node = this.sigma.graph.getNodeAttributes(nodeId);
      if (node.image) {
        this.drawNode(node);
      }
    });
  }
}

class CustomNodeProgram extends NodeProgram {
  constructor(sigma, settings) {
    super(sigma, settings);
  }

  // Overriding the draw method
  drawNode(node, context) {
    const { x, y, size, image } = node;

    const img = new Image();
    img.src = image;

    img.onload = () => {
      context.drawImage(img, x - size / 2, y - size / 2, size, size);
    };
  }

  draw() {
    const context = this.context;
    this.graph.nodes().forEach((nodeId) => {
      const node = this.graph.getNodeAttributes(nodeId);
      if (node.image) {
        this.drawNode(node, context);
      }
    });
  }
}
// Register the custom node renderer
// Sigma.utils.canvas.nodes.customImage = CustomImageNodeRenderer;

interface NodeType {
  x: number;
  y: number;
  label?: string;
  size: number;
  color?: string;
  image: string;
  type: string;
}
interface EdgeType {
  type?: string;
  label?: string;
  size?: number;
  curvature?: number;
  parallelIndex?: number;
  parallelMaxIndex?: number;
}

const SampleGraph = ({ svgVal, inputRef }) => {
  console.log('qwqq', svgVal);
  const sigma = useSigma();
  const sigmaRef = useRef(null);
  const loadGraph = useLoadGraph();

  function svgToDataURI(svg: string): string {
    const escapedSvg = encodeURIComponent(svg)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22');

    return `data:image/svg+xml;charset=utf-8,${escapedSvg}`;
    // const blob = new Blob([svg], { type: 'image/svg+xml' });
    // return URL.createObjectURL(blob);
  }
  console.log('q', svgVal);

  useEffect(() => {
    const graph = new MultiGraphConstructor<NodeType, EdgeType>();

    svgVal.map((svg) => {
      graph.addNode(`${svg.x}.${svg.y}`, {
        x: svg.x,
        y: svg.y,
        size: 60,
        // size: 90,
        color: 'white',
        image: svgToDataURI(svg.val),
        type: 'image',
        // label: svg.name,
      });

      if (svg.edge) {
        console.log('qqwsvg', svg);
        svg.node.forEach((val) => {
          console.log('qqw', val);
          let x = `${svg.x}.${svg.y}`;
          let y = `${val.x}.${val.y}`;
          if (!graph.hasEdge(y, x))
            graph.addEdge(y, x, {
              // label: svg.name,
              size: 3,
              type: 'straight',
            });
        });
      }
    });

    loadGraph(graph);
  }, []);

  return <div ref={sigmaRef} style={{ width: '100%', height: '500px' }} />;

  // return null;
};

export default SampleGraph;
