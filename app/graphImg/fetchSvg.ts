function svgToDataURI(svg: string): string {
  const escapedSvg = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');

  return `data:image/svg+xml;charset=utf-8,${escapedSvg}`;
  // const blob = new Blob([svg], { type: 'image/svg+xml' });
  // return URL.createObjectURL(blob);
}

function TwoMoleculesViewer(smiles) {
  const arr = [];
  console.log('qqq');
  const graph = { nodes: [], edges: [] };
  try {
    let edges = [];
    smiles.map((smile, j) => {
      let node = [];
      let x = j ? j + 0.1 : 0;
      // let prev = 0;
      let length = smile.reactants.length;
      smile.reactants.forEach((val, i) => {
        let y = length - i - j;
        if (!edges.includes(val)) {
          node.push({ x, y });
          const mol1 = window.RDKit.get_mol(val);
          const svgString1 = mol1.get_svg();
          arr.push({ x, val: svgString1, y, name: j ? j : 'qw' });
          graph.nodes.push({
            id: `${x}.${y}`,
            x: x + 50,
            y: y + 30,
            size: 50,
            // data: {
            //   image: svgToDataURI(svg.val),
            //   type: 'image',
            // },
            image: svgToDataURI(val),
            // image: {
            //   url: svgToDataURI(svg.val),
            //   // scale: 1, // Scale to 1 to ensure the image is fully shown
            //   // clipPath: false, // Disable clipping to ensure full image visibility
            // },
            type: 'image',
          });
        } else {
          // prev = arr.at(-1).y;
          x = arr.at(-1).x;
          node.push({ x: arr.at(-1).x, y: arr.at(-1).y });
        }
      });
      const finalVal = smile.reaction_details.slice(
        smile.reaction_details.indexOf('>>') + 2
      );
      edges.push(finalVal);
      const mol1 = window.RDKit.get_mol(finalVal);
      const svgString1 = mol1.get_svg();

      arr.push({
        node,
        val: svgString1,
        edge: true,
        x: x + 2,
        y: smile.reactants.length / 2 - x,
        name: `${j}-eee`,
      });
      graph.edges.push({
        id: `${smile.reactants.length / 2 - x}.${x + 2}`,
        y: x + 2 + 50,
        x: smile.reactants.length / 2 - x,
        size: 3,
        type: 'straight',
        // data: {
        //   image: svgToDataURI(svg.val),
        //   type: 'image',
        // },
        // image: svgToDataURI(val),
        // // image: {
        // //   url: svgToDataURI(svg.val),
        // //   // scale: 1, // Scale to 1 to ensure the image is fully shown
        // //   // clipPath: false, // Disable clipping to ensure full image visibility
        // // },
        // type: 'image',
      });
    });
    return arr;
    // console.log('qww', arr, graph);
    // return graph;
    // return arr;
  } catch (error) {
    console.error('Error generating SVGs:', error);
  }
}

export default TwoMoleculesViewer;
