'use client';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { SigmaContainer } from '@react-sigma/core';
import initRDKit from '../../utils/initRDKit';
import Graph from 'graphology';
import { NodeImageProgram, NodePictogramProgram } from '@sigma/node-image';
import parse from 'html-react-parser';
import SampleGraph from './SampleGraph';

export function MoleculeStructure(props) {
  const defaultProps = {
    subStructure: '',
    className: '',
    width: 250,
    height: 200,
    svgMode: false,
    extraDetails: {},
    drawingDelay: undefined,
  };

  const MOL_DETAILS = {
    width: props.width,
    height: props.height,
    bondLineWidth: 1,
    addStereoAnnotation: true,
    ...props.extraDetails,
  };

  const [svg, setSvg] = useState(undefined);
  const [rdKitLoaded, setrdKitLoaded] = useState(false);
  const [rdKitError, setrdKitError] = useState(false);

  // const drawOnce = (() => {
  //   let wasCalled = false;

  //   return () => {
  //     if (!wasCalled) {
  //       wasCalled = true;
  //       draw();
  //     }
  //   };
  // })();

  const draw = () => {
    if (props.drawingDelay) {
      setTimeout(() => {
        drawSVGorCanvas();
      }, props.drawingDelay);
    } else {
      drawSVGorCanvas();
    }
  };

  const isValidMol = (mol) => {
    return !!mol;
  };

  const drawSVGorCanvas = () => {
    const mol = window.RDKit.get_mol(props.structure || 'invalid');
    const qmol = window.RDKit.get_qmol(props.subStructure || 'invalid');
    const isValidMols = isValidMol(mol);

    if (props.svgMode && isValidMols) {
      const svgVal = mol.get_svg_with_highlights(getMolDetails(mol, qmol));
      // console.log('qqq', svgVal);
      setSvg(svgVal);
      props.setSvgVal((prevProps) => [...prevProps, svgVal]);
    } else if (isValidMols) {
      const canvas = document.getElementById(props.id);
      mol.draw_to_canvas_with_highlights(canvas, getMolDetails(mol, qmol));
    }

    /**
     * Delete C++ mol objects manually
     * https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html#memory-management
     */
    mol?.delete();
    qmol?.delete();
  };

  const getMolDetails = (mol, qmol) => {
    if (isValidMol(mol) && isValidMol(qmol)) {
      const subStructHighlightDetails = JSON.parse(
        mol.get_substruct_matches(qmol)
      );
      const subStructHighlightDetailsMerged = !_.isEmpty(
        subStructHighlightDetails
      )
        ? subStructHighlightDetails.reduce(
            (acc, { atoms, bonds }) => ({
              atoms: [...acc.atoms, ...atoms],
              bonds: [...acc.bonds, ...bonds],
            }),
            { bonds: [], atoms: [] }
          )
        : subStructHighlightDetails;
      return JSON.stringify({
        ...MOL_DETAILS,
        ...(props.extraDetails || {}),
        ...subStructHighlightDetailsMerged,
      });
    } else {
      return JSON.stringify({
        ...MOL_DETAILS,
        ...(props.extraDetails || {}),
      });
    }
  };

  useEffect(() => {
    initRDKit()
      .then(() => {
        setrdKitLoaded(true);
        try {
          draw();
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
        setrdKitError(true);
      });
  }, []);

  if (rdKitError) {
    return 'Error loading renderer.';
  }
  if (!rdKitLoaded) {
    return 'Loading renderer...';
  }

  const mol = window.RDKit.get_mol(props.structure || 'invalid');
  mol?.delete();

  const sigmaSettings = {
    allowInvalidContainer: true,
    //   defaultNodeType: 'pictogram',
    nodeProgramClasses: {
      image: NodeImageProgram,
      pictogram: NodePictogramProgram,
    },
  };

  // return <SampleGraph svg={svg} />;

  // return null;
  //rdkit
  return (
    // <div style={{ display: 'inline' }}>
    <div
      title={props.structure}
      className={'molecule-structure-svg ' + (props.className || '')}
      style={{ width: props.width, height: props.height, display: 'inline' }}
      // dangerouslySetInnerHTML={{ __html: svg }}
    >
      {parse(svg)}
      {/* {props.i !== 0 && props.i % 2 === 0 && <SampleGraph i={props.i} />} */}
    </div>
    // </div>
  );
  // <SigmaContainer
  //   // style={{ height: '50px', width: '100%' }}
  //   className={'molecule-structure-svg ' + (props.className || '')}
  //   // style={{ width: props.width, height: props.height }}
  //   settings={sigmaSettings}
  // >
  //   <SampleGraph svg={svg} />
  //   {/* <ControlsContainer position={'bottom-right'}>
  //     <LayoutsControl />
  //   </ControlsContainer> */}
  // </SigmaContainer>
  // } else {
  //   return (
  //     <div className={'molecule-canvas-container ' + (props.className || '')}>
  //       <canvas
  //         title={props.structure}
  //         id={props.id}
  //         width={props.width}
  //         height={props.height}
  //       ></canvas>
  //     </div>
  //   );
  // }
}

export default MoleculeStructure;
