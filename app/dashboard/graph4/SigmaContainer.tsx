// src/pages/node-image.tsx
'use client';
import { SigmaContainer, ControlsContainer } from '@react-sigma/core';
import { NodeImageProgram, NodePictogramProgram } from '@sigma/node-image';
// import SampleGraph from './SampleGraph';
import SampleGraph from './graphComponent';
import LayoutsControl from './LayoutControl';
import '@react-sigma/core/lib/react-sigma.min.css';

const sigmaSettings = {
  allowInvalidContainer: true,
  //   defaultNodeType: 'pictogram',
  //   defaultNodeType: 'image',
  nodeProgramClasses: {
    image: NodeImageProgram,
    pictogram: NodePictogramProgram,
  },
  //   nodeProgramClasses: {
  //     // pictogram: NodePictogramProgram,
  //     // image: NodeImageProgram,
  //     image: NodePictogramProgram,
  //     //image: NodeImageProgram,
  //   },
};

const NodeImage = () => {
  return (
    <SigmaContainer
      style={{ height: '500px', width: '100%' }}
      settings={sigmaSettings}
    >
      <SampleGraph />
      {/* <ControlsContainer position={'bottom-right'}>
        <LayoutsControl />
      </ControlsContainer> */}
    </SigmaContainer>
  );
};

export default NodeImage;
