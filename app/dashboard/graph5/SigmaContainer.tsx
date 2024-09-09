// src/pages/node-image.tsx
'use client';
import { useState } from 'react';
import { SigmaContainer } from '@react-sigma/core';
import { NodeImageProgram, NodePictogramProgram } from '@sigma/node-image';
import SampleGraph from './SampleGraph';
// import MoleculeStructure from './Mols';
import MoleculeStructure from './MoleculeStructure';
import '@react-sigma/core/lib/react-sigma.min.css';
import { SMILES_LIST } from '../../utils/smiles';
import { data } from '../graphImg/data';

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
  const arr = [];
  data.map((smile) => {
    smile.reactants.forEach((val, i) => {
      arr.push(val);
    });
    const finalVal = smile.reaction_details.slice(
      smile.reaction_details.indexOf('>>') + 2
    );
    arr.push(finalVal);
  });
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {arr.length > 0 && (
        <SigmaContainer
          style={{ height: '5px', width: '100%' }}
          settings={sigmaSettings}
        >
          {/* <MoleculeStructure
          id="structure-example-svg-caffeine"
          smiles1={caffeine}
          smiles2={aspirin}
          // subStructure={caffeineSubStruct}
          height={100}
          width={100}
          svgMode
        /> */}
          {arr.map((smiles, i) => (
            <>
              <MoleculeStructure
                id={smiles}
                structure={smiles}
                // height={0}
                // width={0}
                height={200}
                width={200}
                svgMode
                setSvgVal={setSvgVal}
                i={i}
              />
            </>
          ))}
          {/* <MoleculeStructure
          id="structure-example-svg-caffeine"
          structure={caffeine}
          // subStructure={caffeineSubStruct}
          height={100}
          width={100}
          svgMode
        /> */}
          {/* <MoleculeStructure
          id="structure-example-svg-caffeine"
          structure={aspirin}
          // subStructure={aspirinSubStruct}
          height={100}
          width={100}
          svgMode
        /> */}
          {/* <SampleGraph /> */}
        </SigmaContainer>
      )}
    </div>
  );
};

export default NodeImage;
