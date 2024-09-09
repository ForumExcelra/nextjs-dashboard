// import { MultiDirectedGraph } from './graphComponent';
import RDKitMolecule from './rdkit';
import { NodeImageProgram, NodePictogramProgram } from '@sigma/node-image';
import { SigmaContainer, ControlsContainer } from '@react-sigma/core';
import SampleGraph from './SampleGraph'; // Your updated SampleGraph component

export default function Graph() {
  return <RDKitMolecule />;
}
