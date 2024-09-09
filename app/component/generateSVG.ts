import initRDKit from '../utils/initRDKit';

export const generateSVGFromSMILES = async (smiles) => {
  const RDKit = await initRDKit();

  const mol = RDKit.get_mol(smiles);
  const svg = RDKit.get_svg(mol);
  return svg;
};
