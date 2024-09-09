// src/common/SampleGraph.tsx
'use client';
import { useEffect } from 'react';
import { useSigma } from '@react-sigma/core';
import { MultiDirectedGraph } from 'graphology';

const SampleGraph = () => {
  const sigma = useSigma();

  useEffect(() => {
    // Create a new graph
    const graph = new MultiDirectedGraph();

    // Add some nodes
    graph.addNode('n1', {
      x: 0,
      y: 0,
      size: 15,
      label: 'Node 1',
      color: 'red',
    });
    graph.addNode('n2', {
      x: 1,
      y: 1,
      size: 15,
      label: 'Node 2',
      color: 'blue',
    });

    // Add an edge
    graph.addEdge('n1', 'n2');

    // Load the graph into Sigma
    sigma.getGraph().import(graph);
  }, [sigma]);

  return null;
};

export default SampleGraph;
