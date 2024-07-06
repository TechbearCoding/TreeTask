import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import IterativeTree from '../components/iterative-component'

const initialData = {
    "name": "Root",
    "children": [
      {
        "name": "Child 1",
        "children": [
          { "name": "Grandchild 1" },
          { "name": "Grandchild 2" }
        ]
      },
      { "name": "Child 2" }
    ]
  }

test('renders the tree and adds a child node', () => {
  const { getByText } = render(<IterativeTree initialData={initialData} />);
  
  expect(getByText('Root')).toBeInTheDocument();
  expect(getByText('Lorem')).toBeInTheDocument();
  
  window.prompt = jest.fn().mockImplementation(() => 'New Node');
  fireEvent.click(getByText('+ Add Child'));

  expect(getByText('New Node')).toBeInTheDocument();
});
