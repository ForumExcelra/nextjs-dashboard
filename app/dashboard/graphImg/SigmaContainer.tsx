// src/pages/node-image.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { SigmaContainer, useSigma } from '@react-sigma/core';
import SampleGraph from './SampleGraph';
import '@react-sigma/core/lib/react-sigma.min.css';
import { data } from './data';
import {
  createEdgeArrowProgram,
  EdgeArrowProgram,
  createNodeCompoundProgram,
  createEdgeArrowHeadProgram,
  createEdgeClampedProgram,
  createEdgeCompoundProgram,
} from 'sigma/rendering';
import { EdgeCurvedArrowProgram } from '@sigma/edge-curve';
import initRDKit from '../../utils/initRDKit';
import fetchSvgs from './fetchSvg';
import { createNodeImageProgram } from '@sigma/node-image';
import Sigma from 'sigma';
import '@react-sigma/core/lib/react-sigma.min.css';
import EdgeArrow from './edge.arrowHead';
import myPrivatePackage from 'my-private-package';

const NodePictogramCustomProgram = createNodeImageProgram({
  objectFit: 'contain',
  keepWithinCircle: false,
});

// const createCustomEdgeClampedProgram = (gl) => {
//   const program = createEdgeClampedProgram(gl);
//   console.log('qw', program);
//   // Modify vertex shader to handle curves or extra attributes
//   // program.vertexShaderSource = `
//   //   attribute vec2 a_position;
//   //   attribute vec2 a_normal;
//   //   attribute float a_thickness;
//   //   attribute vec4 a_color;
//   //   attribute float a_label; // For edge labels/icons if needed

//   //   uniform mat3 u_matrix;

//   //   varying vec4 v_color;
//   //   varying float v_label;

//   //   void main() {
//   //     v_color = a_color;
//   //     v_label = a_label; // Pass label data to fragment shader
//   //     vec2 position = (u_matrix * vec3(a_position, 1)).xy;
//   //     gl_Position = vec4(position, 0, 1);
//   //   }
//   // `;

//   // // Modify fragment shader to render colors and labels
//   // program.fragmentShaderSource = `
//   //   precision mediump float;

//   //   varying vec4 v_color;
//   //   varying float v_label; // Use this to display text or icons

//   //   void main() {
//   //     // Render the edge with color and thickness
//   //     gl_FragColor = v_color;

//   //     // Additional logic for icons or labels goes here
//   //     if (v_label > 0.5) {
//   //       // Render label/icon (this is a placeholder)
//   //       // You would use specific conditions to render different symbols or text
//   //     }
//   //   }
//   // `;

//   return program;
// };

// function drawArrow(context, source, target, settings) {
//   const size = settings.arrowSize || 10;
//   const angle = Math.atan2(target.y - source.y, target.x - source.x);
//   context.beginPath();
//   context.moveTo(target.x, target.y);
//   context.lineTo(
//     target.x - size * Math.cos(angle - Math.PI / 6),
//     target.y - size * Math.sin(angle - Math.PI / 6)
//   );
//   context.lineTo(
//     target.x - size * Math.cos(angle + Math.PI / 6),
//     target.y - size * Math.sin(angle + Math.PI / 6)
//   );
//   context.closePath();
//   context.fill();
// }

// function customEdgeRenderer(edge, source, target, context, settings) {
//   console.log('qqq11', edge, attributes);
//   const color = edge.color || settings.defaultEdgeColor;
//   context.strokeStyle = color;
//   context.lineWidth = edge.size || 1;
//   // Example of drawing a curved line
//   const cp = {
//     x: (source.x + target.x) / 2 + (target.y - source.y) / 3,
//     y: (source.y + target.y) / 2 + (source.x - target.x) / 3,
//   };
//   context.beginPath();
//   context.moveTo(source.x, source.y);
//   context.quadraticCurveTo(cp.x, cp.y, target.x, target.y);
//   context.stroke();
//   // Draw arrow if necessary
//   if (edge.type === 'arrow') {
//     drawArrow(context, source, target, settings);
//   }
//   // Draw label if any
//   if (edge.label) {
//     drawLabel(context, edge, source, target, settings);
//   }
// }

// const EdgeArrowProgram = createEdgeCompoundProgram([
//   EdgeArrow,
//   // createEdgeArrowHeadProgram(),
//   createEdgeClampedProgram(),
// ]);

const sigmaSettings = {
  allowInvalidContainer: true,
  defaultNodeType: 'image',
  stagePadding: 20,
  defaultNodeColor: 'white',
  zoomEnabled: false,
  nodeProgramClasses: {
    image: NodePictogramCustomProgram,
  },
  defaultDrawNodeHover: '', // for hover https://www.sigmajs.org/docs/advanced/migration-v2-v3/#canvas-labels-and-hovered-nodes-rendering
  defaultEdgeType: 'straight',
  edgeProgramClasses: {
    straight: EdgeArrowProgram,
    // straight: customEdgeRenderer,
    // curved: EdgeCurvedArrowProgram,
  },
  // edgeReducer: customEdgeRenderer,
};

type NodeType = { x: number; y: number; label: string; size: number };
type EdgeType = { label: string };

const NodeImage = () => {
  const [svgVal, setSvgVal] = useState([]);
  const inputRef = useRef(null);
  const [sigma, setSigma] = useState<Sigma<NodeType, EdgeType> | null>(null);

  useEffect(() => {
    initRDKit()
      .then(() => {
        console.log('qq');
        try {
          const val = fetchSvgs(data);
          setSvgVal(val);
        } catch (err) {
          console.log('qq11');
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (sigma) {
      const graph = sigma.getGraph();

      console.log('qwaa', graph, graph._edges);
      graph._edges.forEach((ed) => {
        console.log('qwaaee', ed);
      });
    }
  }, [sigma]);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {svgVal.length > 0 && (
        <SigmaContainer
          style={{
            height: '100%',
            width: '100%',
          }}
          ref={setSigma}
          settings={sigmaSettings}
          // nodeRenderer={CustomNodeRenderer}
        >
          <SampleGraph svgVal={svgVal} inputRef={inputRef} />
        </SigmaContainer>
      )}
    </div>
  );
};

export default NodeImage;
