import React, { useState, useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';
import '../styles/treestyles.css';

const IterativeTree = ({ initialData }) => {
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

  const addNodeIteratively = (treeData, targetNodeName, newNodeName) => {
    const queue = [treeData];
    while (queue.length > 0) {
      const node = queue.shift();
      if (node.name === targetNodeName) {
        if (!node.children) {
          node.children = [];
        }
        node.children.push({ name: newNodeName });
        setData({ ...treeData }); // Ensure the data state is updated correctly
        return;
      } else if (node.children) {
        queue.push(...node.children);
      }
    }
  };

  const handleAddNode = (targetNode) => {
    const newNodeName = prompt('Enter node name:');
    if (newNodeName) {
      const newData = { ...data };
      addNodeIteratively(newData, targetNode.name, newNodeName);
    }
  };

  const renderCustomNode = ({ nodeDatum, toggleNode }) => (
    <g className="custom-node">
      <circle r="15" />
      <text x="20" y="5">
        {nodeDatum.name}
      </text>
      <text
        x="20"
        y="20"
        onClick={() => handleAddNode(nodeDatum)}
        className="add-child"
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

export default IterativeTree;
