// src/pages/node-image.tsx
'use client';
import { useState, useEffect } from 'react';
import { SigmaContainer } from '@react-sigma/core';
import { NodeImageProgram, NodePictogramProgram } from '@sigma/node-image';
import SampleGraph from './SampleGraph';
import MoleculeStructure from './Mols';
// import MoleculeStructure from './MoleculeStructure';
import '@react-sigma/core/lib/react-sigma.min.css';
import { data } from './data';
import ForceGraph3D from 'react-force-graph-3d';
import initRDKit from '../../utils/initRDKit';
import fetchSvgs from './fetchSvg';

const caffeine = 'CN1C=NC2=C1C(=O)N(C(=O)N2C)';
const caffeineSubStruct = '[N,n,o,O]';

const aspirin = 'CC(=O)Oc1ccccc1C(=O)O';
const aspirinSubStruct = '[O,o].c1ccccc1';

const sigmaSettings = {
  allowInvalidContainer: true,
  nodeProgramClasses: {
    image: NodeImageProgram,
    pictogram: NodePictogramProgram,
  },
};

const NodeImage = () => {
  const [svgVal, setSvgVal] = useState([]);

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
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {svgVal.length > 0 && (
        <SigmaContainer
          style={{ height: '100%', width: '100%' }}
          settings={sigmaSettings}
        >
          <SampleGraph svgVal={svgVal} />
        </SigmaContainer>
      )}
    </div>
  );
};

export default NodeImage;
