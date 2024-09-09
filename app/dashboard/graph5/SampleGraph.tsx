// src/common/SampleGraph.tsx
import { useEffect } from 'react';
import { useLoadGraph, useSigma } from '@react-sigma/core';
import { MultiDirectedGraph } from 'graphology';
import canvg from 'canvg';

const SampleGraph = ({ i }) => {
  // console.log('qaqa', i);
  const sigma = useSigma();
  const loadGraph = useLoadGraph();

  const abc = `<svg version='1.1' baseProfile='full'
              xmlns='http://www.w3.org/2000/svg'
                      xmlns:rdkit='http://www.rdkit.org/xml'
                      xmlns:xlink='http://www.w3.org/1999/xlink'
                  xml:space='preserve'
width='50px' height='50px' viewBox='0 0 50 50'>
<!-- END OF HEADER -->
<rect style='opacity:1.0;fill:#FFFFFF;stroke:none' width='50.0' height='50.0' x='0.0' y='0.0'> </rect>
<path class='bond-0 atom-0 atom-1' d='M 47.9,27.1 L 45.1,25.1' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-0 atom-0 atom-1' d='M 45.1,25.1 L 42.3,23.0' style='fill:none;fill-rule:evenodd;stroke:#0000FF;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-1 atom-1 atom-2' d='M 40.4,19.2 L 40.4,15.8' style='fill:none;fill-rule:evenodd;stroke:#0000FF;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-1 atom-1 atom-2' d='M 40.4,15.8 L 40.4,12.4' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-2 atom-2 atom-3' d='M 40.4,12.4 L 37.0,11.3' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-2 atom-2 atom-3' d='M 37.0,11.3 L 33.6,10.2' style='fill:none;fill-rule:evenodd;stroke:#0000FF;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-2 atom-2 atom-3' d='M 39.0,13.4 L 36.1,12.4' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-2 atom-2 atom-3' d='M 36.1,12.4 L 33.1,11.5' style='fill:none;fill-rule:evenodd;stroke:#0000FF;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-3 atom-3 atom-4' d='M 29.9,12.0 L 28.1,14.5' style='fill:none;fill-rule:evenodd;stroke:#0000FF;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-3 atom-3 atom-4' d='M 28.1,14.5 L 26.2,17.0' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-4 atom-4 atom-5' d='M 26.2,17.0 L 31.6,24.5' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-4 atom-4 atom-5' d='M 27.9,17.0 L 32.2,22.8' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-5 atom-5 atom-6' d='M 31.6,24.5 L 27.9,32.9' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-6 atom-6 atom-7' d='M 27.1,33.0 L 29.0,35.7' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-6 atom-6 atom-7' d='M 29.0,35.7 L 30.9,38.3' style='fill:none;fill-rule:evenodd;stroke:#FF0000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-6 atom-6 atom-7' d='M 28.2,32.2 L 30.1,34.8' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-6 atom-6 atom-7' d='M 30.1,34.8 L 32.1,37.5' style='fill:none;fill-rule:evenodd;stroke:#FF0000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-7 atom-6 atom-8' d='M 27.9,32.9 L 24.2,33.3' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-7 atom-6 atom-8' d='M 24.2,33.3 L 20.6,33.6' style='fill:none;fill-rule:evenodd;stroke:#0000FF;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-8 atom-8 atom-9' d='M 16.9,31.4 L 15.1,28.9' style='fill:none;fill-rule:evenodd;stroke:#0000FF;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-8 atom-8 atom-9' d='M 15.1,28.9 L 13.3,26.4' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-9 atom-9 atom-10' d='M 13.6,25.6 L 9.9,26.0' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-9 atom-9 atom-10' d='M 9.9,26.0 L 6.3,26.4' style='fill:none;fill-rule:evenodd;stroke:#FF0000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-9 atom-9 atom-10' d='M 13.7,27.0 L 10.1,27.4' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-9 atom-9 atom-10' d='M 10.1,27.4 L 6.4,27.8' style='fill:none;fill-rule:evenodd;stroke:#FF0000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-10 atom-9 atom-11' d='M 13.3,26.4 L 14.6,23.4' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-10 atom-9 atom-11' d='M 14.6,23.4 L 15.9,20.4' style='fill:none;fill-rule:evenodd;stroke:#0000FF;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-11 atom-11 atom-12' d='M 15.3,15.5 L 13.4,13.0' style='fill:none;fill-rule:evenodd;stroke:#0000FF;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-11 atom-11 atom-12' d='M 13.4,13.0 L 11.6,10.5' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-12 atom-5 atom-1' d='M 31.6,24.5 L 35.1,23.4' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-12 atom-5 atom-1' d='M 35.1,23.4 L 38.5,22.3' style='fill:none;fill-rule:evenodd;stroke:#0000FF;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-13 atom-11 atom-4' d='M 18.9,17.7 L 22.6,17.4' style='fill:none;fill-rule:evenodd;stroke:#0000FF;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path class='bond-13 atom-11 atom-4' d='M 22.6,17.4 L 26.2,17.0' style='fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' />
<path d='M 40.4,12.6 L 40.4,12.4 L 40.3,12.3' style='fill:none;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
<path d='M 28.0,32.5 L 27.9,32.9 L 27.7,32.9' style='fill:none;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
<path d='M 13.4,26.5 L 13.3,26.4 L 13.3,26.2' style='fill:none;stroke:#000000;stroke-width:1.0px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' />
<path class='atom-1' d='M 39.5 19.5
L 40.9 21.8
Q 41.0 22.0, 41.2 22.4
Q 41.5 22.8, 41.5 22.8
L 41.5 19.5
L 42.0 19.5
L 42.0 23.8
L 41.4 23.8
L 40.0 21.3
Q 39.8 21.0, 39.6 20.7
Q 39.4 20.4, 39.4 20.3
L 39.4 23.8
L 38.8 23.8
L 38.8 19.5
L 39.5 19.5
' fill='#0000FF'/>
<path class='atom-3' d='M 30.7 7.4
L 32.1 9.7
Q 32.3 9.9, 32.5 10.3
Q 32.7 10.7, 32.7 10.7
L 32.7 7.4
L 33.3 7.4
L 33.3 11.7
L 32.7 11.7
L 31.2 9.2
Q 31.0 8.9, 30.8 8.6
Q 30.7 8.2, 30.6 8.1
L 30.6 11.7
L 30.1 11.7
L 30.1 7.4
L 30.7 7.4
' fill='#0000FF'/>
<path class='atom-7' d='M 31.3 40.4
Q 31.3 39.4, 31.8 38.8
Q 32.3 38.2, 33.3 38.2
Q 34.2 38.2, 34.7 38.8
Q 35.2 39.4, 35.2 40.4
Q 35.2 41.4, 34.7 42.0
Q 34.2 42.6, 33.3 42.6
Q 32.3 42.6, 31.8 42.0
Q 31.3 41.4, 31.3 40.4
M 33.3 42.1
Q 33.9 42.1, 34.3 41.7
Q 34.6 41.2, 34.6 40.4
Q 34.6 39.6, 34.3 39.1
Q 33.9 38.7, 33.3 38.7
Q 32.6 38.7, 32.3 39.1
Q 31.9 39.6, 31.9 40.4
Q 31.9 41.2, 32.3 41.7
Q 32.6 42.1, 33.3 42.1
' fill='#FF0000'/>
<path class='atom-8' d='M 12.9 31.7
L 13.5 31.7
L 13.5 33.5
L 15.6 33.5
L 15.6 31.7
L 16.2 31.7
L 16.2 36.0
L 15.6 36.0
L 15.6 34.0
L 13.5 34.0
L 13.5 36.0
L 12.9 36.0
L 12.9 31.7
' fill='#0000FF'/>
<path class='atom-8' d='M 17.7 31.7
L 19.1 34.0
Q 19.3 34.2, 19.5 34.6
Q 19.7 35.0, 19.7 35.0
L 19.7 31.7
L 20.3 31.7
L 20.3 36.0
L 19.7 36.0
L 18.2 33.5
Q 18.0 33.2, 17.8 32.9
Q 17.7 32.6, 17.6 32.5
L 17.6 36.0
L 17.1 36.0
L 17.1 31.7
L 17.7 31.7
' fill='#0000FF'/>
<path class='atom-10' d='M 2.1 27.3
Q 2.1 26.3, 2.6 25.7
Q 3.1 25.2, 4.1 25.2
Q 5.0 25.2, 5.5 25.7
Q 6.0 26.3, 6.0 27.3
Q 6.0 28.4, 5.5 28.9
Q 5.0 29.5, 4.1 29.5
Q 3.1 29.5, 2.6 28.9
Q 2.1 28.4, 2.1 27.3
M 4.1 29.0
Q 4.7 29.0, 5.1 28.6
Q 5.4 28.2, 5.4 27.3
Q 5.4 26.5, 5.1 26.1
Q 4.7 25.6, 4.1 25.6
Q 3.4 25.6, 3.1 26.1
Q 2.7 26.5, 2.7 27.3
Q 2.7 28.2, 3.1 28.6
Q 3.4 29.0, 4.1 29.0
' fill='#FF0000'/>
<path class='atom-11' d='M 16.1 15.8
L 17.5 18.1
Q 17.6 18.3, 17.8 18.7
Q 18.1 19.1, 18.1 19.1
L 18.1 15.8
L 18.6 15.8
L 18.6 20.1
L 18.1 20.1
L 16.6 17.6
Q 16.4 17.3, 16.2 17.0
Q 16.0 16.7, 16.0 16.5
L 16.0 20.1
L 15.4 20.1
L 15.4 15.8
L 16.1 15.8
' fill='#0000FF'/>
</svg>`;

  const STRING_SVG_ICON = `<svg
    fill="#000000"
    stroke-width="0"
    viewBox="0 0 320 512"
    height="200px"
    width="200px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M142.9 96c-21.5 0-42.2 8.5-57.4 23.8L54.6 150.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L40.2 74.5C67.5 47.3 104.4 32 142.9 32C223 32 288 97 288 177.1c0 38.5-15.3 75.4-42.5 102.6L109.3 416H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9L200.2 234.5c15.2-15.2 23.8-35.9 23.8-57.4c0-44.8-36.3-81.1-81.1-81.1z"
    ></path>
  </svg>`;

  function svgToDataURI(svg: string): string {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    return URL.createObjectURL(blob);
  }

  function svgToImg(svg) {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Render the SVG string onto the canvas
    canvg(canvas, svg);

    // Convert the canvas to a PNG data URL
    const pngDataUrl = canvas.toDataURL('image/png');
    return pngDataUrl;
  }

  useEffect(() => {
    // Create a new graph
    const graph = new MultiDirectedGraph();

    // Add some nodes
    // graph.addNode('n1', {
    //   x: 50,
    //   y: 200,
    //   size: 1,
    //   // image: 'https://icons.getbootstrap.com/assets/icons/chat.svg',
    // });
    // graph.addNode('n2', {
    //   x: 100,
    //   y: 200,
    //   size: 1,
    //   // image: 'https://icons.getbootstrap.com/assets/icons/chat.svg',
    // });
    graph.addNode('n1', {
      x: 3,
      y: -2,
      size: 20,
      label: 'C',
      color: 'red',
      image: svgToImg(svg),
      type: 'image',
      // image: 'https://icons.getbootstrap.com/assets/icons/chat.svg',
    });
    // graph.addNode('n1', {
    //   x: 3,
    //   y: -2,
    //   size: 100,
    //   label: 'C',
    //   color: 'red',
    //   image: svgToImg(abc),
    //   type: 'image',
    //   // type: 'pictogram',
    // });
    // graph.addNode('n2', {
    //   x: 1,
    //   y: -1,
    //   size: 40,
    //   label: 'B',
    //   color: 'red',
    //   image: svgToDataURI(STRING_SVG_ICON),
    //   type: 'pictogram',
    //   // image: 'https://icons.getbootstrap.com/assets/icons/building.svg',
    //   // pictogram: dataURI1, // URL to the image
    //   // type: 'pictogram',
    // });

    // Add an edge
    graph.addEdge('n1', 'n2');

    // Load the graph into Sigma
    loadGraph(graph);
    // sigma.refresh();
  }, [loadGraph]);

  return null;
};

export default SampleGraph;
