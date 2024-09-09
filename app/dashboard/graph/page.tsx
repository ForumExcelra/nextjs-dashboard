// pages/index.js
import React from 'react';
import { MultiDirectedGraph } from './graphComponent';

const Home = () => {
  return (
    <div>
      <h1>Graphology with Sigma.js in Next.js</h1>
      <MultiDirectedGraph style={{ height: '500px', width: '500px' }} />
    </div>
  );
};

export default Home;
