function TwoMoleculesViewer(smiles) {
  const arr = [];
  console.log('qqq');
  try {
    let edges = [];
    smiles.map((smile, j) => {
      let node = [];
      let x = j ? j + 3 : 0;
      let length = smile.reactants.length - 1;
      let sum = 0;
      let count = 0;
      const edgeVal = smile.reactants.filter((val) => edges.includes(val))[0];
      if (edgeVal) {
        const prev = arr.filter((value) => value.name === edgeVal)[0];
        node.push({ x: prev.x, y: prev.y });
        x = prev.x;
        if (smile.reactants[0] !== edgeVal) count = 1;
      }
      smile.reactants.forEach((val, i) => {
        let y = length - i - j - count;
        // let y = length - i + 0.1;
        // let y = i ? i + 0.1 : 0;
        // let y = length - 1 - i - j * 0.01;
        // let y = (length - 1) * 0.01 + i - j;
        if (!edges.includes(val)) {
          node.push({ x, y });
          sum += y;
          const mol1 = window.RDKit.get_mol(val);
          const svgString1 = mol1.get_svg();
          arr.push({ x, val: svgString1, y, name: val });
        } else {
          // const prev = arr.filter((value) => value.name === val)[0];
          // x = prev.x;
          // node.push({ x: prev.x, y: prev.y });
          //not this
          // const prev = arr.at(-1).y;
          // const prev = arr.filter((value) => value.name === val)[0];
          // // // x = arr.at(-1).x;
          // console.log('qqx', arr, arr.at(-1), j, prev);
          // // node.push({ x: prev.x, y: prev.y });
        }
      });
      const finalVal = smile.reaction_details.slice(
        smile.reaction_details.indexOf('>>') + 2
      );
      edges.push(finalVal);
      const mol1 = window.RDKit.get_mol(finalVal);
      const svgString1 = mol1.get_svg();

      let cordY;
      if (length) {
        if (j) {
          cordY = sum + length / 2 + 0.3;
        } else cordY = sum - length / 2;
      } else cordY = arr.at(-1).y;

      arr.push({
        node,
        val: svgString1,
        edge: true,
        x: x + 2,
        y: cordY,
        // y: sum - (length + 1) / 2 + length * 0.1,
        name: finalVal,
      });
    });
    console.log('qww', arr);
    return arr;
  } catch (error) {
    console.error('Error generating SVGs:', error);
  }
}

export default TwoMoleculesViewer;
