import React from 'react';
import RecursiveTree from '../components/recursive-component';
import fs from 'fs';
import path from 'path';

const RecursivePage = ({ initialData }) => {
  return (
    <div>
      <h1>Recursive Tree</h1>
      <RecursiveTree initialData={initialData} />
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

export default RecursivePage;
