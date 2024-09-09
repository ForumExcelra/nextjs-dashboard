'use client';
import { useEffect, useState } from 'react';
// import useRDKit from './useRDKit';
import initRDKit from '../../utils/initRDKit';
import SampleGraph from './SampleGraph';

const TwoMoleculesViewer = ({ smiles1, smiles2 }) => {
  //   const RDKit = useRDKit();
  const [svg1, setSvg1] = useState('');
  const [svg2, setSvg2] = useState('');

  useEffect(() => {
    initRDKit()
      .then(() => {
        try {
          draw();
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getMolDetails = () => {
    const MOL_DETAILS = {
      width: 100,
      height: 100,
      bondLineWidth: 1,
      addStereoAnnotation: true,
    };

    return JSON.stringify({
      ...MOL_DETAILS,
    });
  };

  const draw = () => {
    if (smiles1 && smiles2) {
      try {
        const mol1 = window.RDKit.get_mol(smiles1);
        const mol2 = window.RDKit.get_mol(smiles2);

        const svgString1 = mol1.get_svg();
        const svgString2 = mol2.get_svg();

        // const svgString1 = mol1.get_svg_with_highlights(getMolDetails(mol1));
        // const svgString2 = mol2.get_svg_with_highlights(getMolDetails(mol2));

        setSvg1(svgString1);
        setSvg2(svgString2);
      } catch (error) {
        console.error('Error generating SVGs:', error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div dangerouslySetInnerHTML={{ __html: svg1 }} />
      <div dangerouslySetInnerHTML={{ __html: svg2 }} />
    </div>
  );
};

export default TwoMoleculesViewer;
