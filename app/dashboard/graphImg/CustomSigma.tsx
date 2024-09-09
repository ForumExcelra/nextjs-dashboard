// src/components/CustomReactSigma.tsx
import React from 'react';
import { SigmaContainer, useLoadGraph } from '@react-sigma/core';
import CustomNodeRenderer from './CustomNodeRenderer';

const CustomReactSigma: React.FC<{ svgVal: string[] }> = ({ svgVal }) => {
  //   useLoadGraph(); // Use this hook to load or manipulate the graph

  return (
    <SigmaContainer style={{ height: '600px', width: '800px' }}>
      <CustomNodeRenderer svgVal={svgVal} />
    </SigmaContainer>
  );
};

export default CustomReactSigma;
