import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RecursiveTree from '../components/recursive-component';

const initialData = {
  name: "Root",
  children: [
    {
      name: "Child 1",
      children: [
        { name: "Grandchild 1" },
        { name: "Grandchild 2" }
      ]
    },
    { name: "Child 2" }
  ]
};

test('renders the tree and adds a child node', () => {
  const { getByText } = render(<RecursiveTree initialData={initialData} />);
  
  expect(getByText('Root')).toBeInTheDocument();
  expect(getByText('Child 1')).toBeInTheDocument();
  expect(getByText('Child 2')).toBeInTheDocument();
  expect(getByText('Grandchild 1')).toBeInTheDocument();
  expect(getByText('Grandchild 2')).toBeInTheDocument();
  
  window.prompt = jest.fn().mockImplementation(() => 'New Node');
  fireEvent.click(getByText('+ Add Child'));

  expect(getByText('New Node')).toBeInTheDocument();
});
