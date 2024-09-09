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

    // graph.addNode('a', {
    //   x: 0,
    //   y: 0,
    //   size: faker.number.int({ min: 4, max: 20 }),
    //   color: randomColor(),
    //   label: faker.person.fullName(),
    // });
    // graph.addNode('b', {
    //   x: 1,
    //   y: -1,
    //   size: faker.number.int({ min: 4, max: 20 }),
    //   color: randomColor(),
    //   label: faker.person.fullName(),
    // });
    // graph.addNode('c', {
    //   x: 3,
    //   y: -2,
    //   size: faker.number.int({ min: 4, max: 20 }),
    //   color: randomColor(),
    //   label: faker.person.fullName(),
    // });
    // graph.addNode('d', {
    //   x: 1,
    //   y: -3,
    //   size: faker.number.int({ min: 4, max: 20 }),
    //   color: randomColor(),
    //   label: faker.person.fullName(),
    // });
    // graph.addNode('e', {
    //   x: 3,
    //   y: -4,
    //   size: faker.number.int({ min: 4, max: 20 }),
    //   color: randomColor(),
    //   label: faker.person.fullName(),
    // });
    // graph.addNode('f', {
    //   x: 4,
    //   y: -5,
    //   size: faker.number.int({ min: 4, max: 20 }),
    //   color: randomColor(),
    //   label: faker.person.fullName(),
    // });

    // graph.addEdge('a', 'b', {
    //   label: faker.date.anytime().toISOString(),
    //   size: faker.number.int({ min: 1, max: 5 }),
    // });
    // graph.addEdge('b', 'c', {
    //   label: faker.date.anytime().toISOString(),
    //   size: faker.number.int({ min: 1, max: 5 }),
    // });
    // graph.addEdge('b', 'd', {
    //   label: faker.date.anytime().toISOString(),
    //   size: faker.number.int({ min: 1, max: 5 }),
    // });
    // graph.addEdge('c', 'b', {
    //   label: faker.date.anytime().toISOString(),
    //   size: faker.number.int({ min: 1, max: 5 }),
    // });
    // graph.addEdge('c', 'e', {
    //   label: faker.date.anytime().toISOString(),
    //   size: faker.number.int({ min: 1, max: 5 }),
    // });
    // graph.addEdge('d', 'c', {
    //   label: faker.date.anytime().toISOString(),
    //   size: faker.number.int({ min: 1, max: 5 }),
    // });
    // graph.addEdge('d', 'e', {
    //   label: faker.date.anytime().toISOString(),
    //   size: faker.number.int({ min: 1, max: 5 }),
    // });
    // graph.addEdge('d', 'e', {
    //   label: faker.date.anytime().toISOString(),
    //   size: faker.number.int({ min: 1, max: 5 }),
    // });
    // graph.addEdge('d', 'e', {
    //   label: faker.date.anytime().toISOString(),
    //   size: faker.number.int({ min: 1, max: 5 }),
    // });
    // graph.addEdge('d', 'e', {
    //   label: faker.date.anytime().toISOString(),
    //   size: faker.number.int({ min: 1, max: 5 }),
    // });
    // graph.addEdge('e', 'd', {
    //   label: faker.date.anytime().toISOString(),
    //   size: faker.number.int({ min: 1, max: 5 }),
    // });
    // graph.addEdge('e', 'f', {
    //   label: faker.date.anytime().toISOString(),
    //   size: faker.number.int({ min: 1, max: 5 }),
    // });
    // graph.addEdge('f', 'e', {
    //   label: faker.date.anytime().toISOString(),
    //   size: faker.number.int({ min: 1, max: 5 }),
    // });
    // graph.addEdge('f', 'e', {
    //   label: faker.date.anytime().toISOString(),
    //   size: faker.number.int({ min: 1, max: 5 }),
    // });
    graph.addNode('a1', { x: 0, y: 0, size: 10 });
    graph.addNode('b1', { x: 10, y: 0, size: 20 });
    graph.addNode('c1', { x: 20, y: 0, size: 10 });
    graph.addNode('d1', { x: 30, y: 0, size: 10 });
    graph.addNode('e1', { x: 40, y: 0, size: 20 });
    graph.addNode('a2', { x: 0, y: -10, size: 20 });
    graph.addNode('b2', { x: 10, y: -10, size: 10 });
    graph.addNode('c2', { x: 20, y: -10, size: 10 });
    graph.addNode('d2', { x: 30, y: -10, size: 20 });
    graph.addNode('e2', { x: 40, y: -10, size: 10 });

    // Parallel edges in the same direction:
    graph.addEdge('a1', 'b1', { size: 6 });
    graph.addEdge('b1', 'c1', { size: 3 });
    graph.addEdge('b1', 'c1', { size: 6 });
    graph.addEdge('c1', 'd1', { size: 3 });
    graph.addEdge('c1', 'd1', { size: 6 });
    graph.addEdge('c1', 'd1', { size: 10 });
    graph.addEdge('d1', 'e1', { size: 3 });
    graph.addEdge('d1', 'e1', { size: 6 });
    graph.addEdge('d1', 'e1', { size: 10 });
    graph.addEdge('d1', 'e1', { size: 3 });
    graph.addEdge('d1', 'e1', { size: 10 });

    // Parallel edges in both directions:
    graph.addEdge('a2', 'b2', { size: 3 });
    graph.addEdge('b2', 'a2', { size: 6 });

    graph.addEdge('b2', 'c2', { size: 6 });
    graph.addEdge('b2', 'c2', { size: 10 });
    graph.addEdge('c2', 'b2', { size: 3 });
    graph.addEdge('c2', 'b2', { size: 3 });

    graph.addEdge('c2', 'd2', { size: 3 });
    graph.addEdge('c2', 'd2', { size: 6 });
    graph.addEdge('c2', 'd2', { size: 6 });
    graph.addEdge('c2', 'd2', { size: 10 });
    graph.addEdge('d2', 'c2', { size: 3 });

    graph.addEdge('d2', 'e2', { size: 3 });
    graph.addEdge('d2', 'e2', { size: 3 });
    graph.addEdge('d2', 'e2', { size: 3 });
    graph.addEdge('d2', 'e2', { size: 6 });
    graph.addEdge('d2', 'e2', { size: 10 });
    graph.addEdge('e2', 'd2', { size: 3 });
    graph.addEdge('e2', 'd2', { size: 3 });
    graph.addEdge('e2', 'd2', { size: 6 });
    graph.addEdge('e2', 'd2', { size: 6 });
    graph.addEdge('e2', 'd2', { size: 10 });

    // Use dedicated helper to identify parallel edges:
    indexParallelEdgesIndex(graph, {
      edgeIndexAttribute: 'parallelIndex',
      edgeMaxIndexAttribute: 'parallelMaxIndex',
    });

    // Adapt types and curvature of parallel edges for rendering:
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
