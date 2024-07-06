import React from 'react';
import IterativeTree from '../components/iterative-component';
import fs from 'fs';
import path from 'path';

const IterativePage = ({ initialData }) => {
  return (
    <div>
      <h1>Iterative Tree</h1>
      <IterativeTree initialData={initialData} />
    </div>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'treeData.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const initialData = JSON.parse(jsonData);

  return {
    props: {
      initialData,
    },
  };
}

export default IterativePage;
