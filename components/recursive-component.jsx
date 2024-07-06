import React, { useState, useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';
import '../styles/treestyles.css';

const RecursiveTree = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [translate, setTranslate] = useState({ x: 0, y: 50 });
  const [zoom, setZoom] = useState(1);
  const treeContainerRef = useRef(null);

  useEffect(() => {
    if (treeContainerRef.current) {
      const dimensions = treeContainerRef.current.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2,
        y: 50,
      });
    }
  }, [treeContainerRef]);

  useEffect(() => {
    const handleResize = () => {
      if (treeContainerRef.current) {
        const containerDimensions = treeContainerRef.current.getBoundingClientRect();
        const treeDimensions = calculateTreeDimensions(data);
        const newZoom = Math.min(
          containerDimensions.width / treeDimensions.width,
          containerDimensions.height / treeDimensions.height
        );
        setZoom(newZoom);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  const calculateTreeDimensions = (node) => {
    let width = 0;
    let height = 0;

    const calculate = (n, depth = 0) => {
      if (n.children) {
        n.children.forEach((child) => calculate(child, depth + 1));
      }
      width = Math.max(width, (depth + 1) * 200); 
      height += 50; 
    };

    calculate(node);
    return { width, height };
  };

  const addNode = (node, name) => {
    if (!node.children) {
      node.children = [];
    }
    node.children.push({ name });
  };

  const handleAddNode = (targetNode) => {
    const name = prompt('Enter node name:');
    if (name) {
      const newData = { ...data };
      findAndAddNode(newData, targetNode, name);
      setData(newData);
    }
  };

  const findAndAddNode = (currentNode, targetNode, name) => {
    if (currentNode.name === targetNode.name) {
      addNode(currentNode, name);
    } else if (currentNode.children) {
      currentNode.children.forEach((child) =>
        findAndAddNode(child, targetNode, name)
      );
    }
  };

  const renderCustomNode = ({ nodeDatum, toggleNode }) => (
    <g className="custom-node">
      <circle r="15" fill="white" stroke="black" strokeWidth="1" />
      <text fill="black" x="20" y="5" style={{ fontWeight: 'normal' }}>
        {nodeDatum.name}
      </text>
      <text
        fill="blue"
        x="20"
        y="20"
        onClick={() => handleAddNode(nodeDatum)}
        style={{ cursor: 'pointer', fontWeight: 'normal' }}
      >
        + Add Child
      </text>
    </g>
  );

  return (
    <div ref={treeContainerRef} style={{ width: '100vw', height: '100vh' }}>
      <div id="treeWrapper" style={{ width: '100%', height: '100%' }}>
        <Tree
          data={data}
          translate={translate}
          zoom={zoom}
          orientation="vertical"
          renderCustomNodeElement={renderCustomNode}
        />
      </div>
    </div>
  );
};
export default RecursiveTree;
