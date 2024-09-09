'use client';

import MoleculeStructure from '../../component/MoleculeStructure';
import { SMILES_LIST } from '../../utils/smiles';

function ExampleSVG() {
  //   const caffeine = 'CN1C=NC2=C1C(=O)N(C(=O)N2C)';
  //   const aspirin = 'CC(=O)Oc1ccccc1C(=O)O';

  return (
    <div id="component-example-svg" className="container">
      <div
        id="structure-list"
        className="columns is-desktop"
        style={{ margin: '12px', overflowX: 'scroll' }}
      >
        {SMILES_LIST.map((smiles) => (
          <div
            className="column"
            key={smiles}
            style={{ height: '50px', width: '50px' }}
          >
            {/* <div style={{ height: '50px', width: '50px' }}> */}
            <MoleculeStructure
              id={smiles}
              structure={smiles}
              height={200}
              width={200}
              svgMode
            />
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExampleSVG;
