'use client';
import { FC, useEffect, useMemo, CSSProperties } from 'react';
import { MultiDirectedGraph as MultiGraphConstructor } from 'graphology';
import EdgeCurveProgram, {
  DEFAULT_EDGE_CURVATURE,
  indexParallelEdgesIndex,
} from '@sigma/edge-curve';
import { EdgeArrowProgram } from 'sigma/rendering';

import { SigmaContainer, useLoadGraph } from '@react-sigma/core';
import '@react-sigma/core/lib/react-sigma.min.css';

import { useRandom } from '../../common/useRandom';

interface NodeType {
  x: number;
  y: number;
  label: string;
  size: number;
  color: string;
}
interface EdgeType {
  type?: string;
  label?: string;
  size?: number;
  curvature?: number;
  parallelIndex?: number;
  parallelMaxIndex?: number;
}

const MyGraph: React.FC = () => {
  const { faker, randomColor } = useRandom();
  const loadGraph = useLoadGraph<NodeType, EdgeType>();

  useEffect(() => {
    // Create the graph
    const graph = new MultiGraphConstructor<NodeType, EdgeType>();

    graph.addNode('ReactantA', {
      x: 0,
      y: 0,
      size: 10,
      color: '#FF0000', // Red for reactant
      label: 'CC(=O)Nc1ccccc1Br\nReactant A',
    });
    graph.addNode('ReactantB', {
      x: 100,
      y: 0,
      size: 10,
      color: '#FF0000', // Red for reactant
      label: 'CCOC(=O)CCl\nReactant B',
    });
    graph.addNode('Product', {
      x: 50,
      y: -100,
      size: 10,
      color: '#0000FF', // Blue for product
      label: 'CCOC(=O)Cc1ccccc1NC(C)=O\nProduct',
    });

    // Add edges (reactions)
    graph.addEdge('ReactantA', 'Product', { size: 2, label: 'Reacted with' });
    graph.addEdge('ReactantB', 'Product', { size: 2, label: 'Reacted with' });

    // Use dedicated helper to identify parallel edges
    indexParallelEdgesIndex(graph, {
      edgeIndexAttribute: 'parallelIndex',
      edgeMaxIndexAttribute: 'parallelMaxIndex',
    });

    // Adapt types and curvature of parallel edges for rendering
    graph.forEachEdge((edge, { parallelIndex, parallelMaxIndex }) => {
      if (typeof parallelIndex === 'number') {
        graph.mergeEdgeAttributes(edge, {
          type: 'curved',
          curvature:
            DEFAULT_EDGE_CURVATURE +
            (3 * DEFAULT_EDGE_CURVATURE * parallelIndex) /
              (parallelMaxIndex || 1),
        });
      } else {
        graph.setEdgeAttribute(edge, 'type', 'straight');
      }
    });

    // load the graph in sigma
    loadGraph(graph);
    console.log('er', graph);
  }, [loadGraph, faker, randomColor]);

  return null;
};

export const MultiDirectedGraph: FC<{ style?: CSSProperties }> = ({
  style,
}) => {
  // Sigma settings
  console.log('sd');
  const settings = useMemo(
    () => ({
      allowInvalidContainer: true,
      renderEdgeLabels: true,
      defaultEdgeType: 'straight',
      edgeProgramClasses: {
        straight: EdgeArrowProgram,
        curved: EdgeCurveProgram,
      },
    }),
    []
  );

  return (
    <SigmaContainer
      style={style}
      graph={MultiGraphConstructor<NodeType, EdgeType>}
      settings={settings}
    >
      <MyGraph />
    </SigmaContainer>
  );
};
