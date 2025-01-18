import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DraggableItem = ({ name, image }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align content to the left
        minWidth: '60px', // Minimum width for shorter text
        maxWidth: '100px', // Optional: Prevent the box from being too wide
        padding: '10px', // Add some padding for spacing
        height: '30px', // Fixed height
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: isDragging ? '#e3f2fd' : '#fff',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        overflow: 'hidden', // Prevent content overflow
      }}
    >
      <img
        src={image}
        alt={name}
        style={{ width: '40px', height: '40px', marginRight: '10px' }}
      />
      <p
        style={{
          fontSize: '14px',
          margin: 0,
          whiteSpace: 'nowrap', // Keep text on a single line
          overflow: 'hidden', // Hide overflowed text
          textOverflow: 'ellipsis', // Show ellipsis for long text
        }}
      >
        {name}
      </p>
    </div>
  );
};

// Drop Zone Component
const DropZone = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item) => onDrop(item.name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        border: '2px dashed #ccc',
        padding: '20px',
        width: '100%',
        height: '100%',
        backgroundColor: isOver ? '#f0f8ff' : '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      {isOver ? 'Release to Drop' : 'Drop items here'}
    </div>
  );
};

// Main App Component
const App = () => {
  const [craftResult, setCraftResult] = useState('');

  const handleDrop = (itemName) => {
    const result = generateCombination(itemName, 'Fire');
    setCraftResult(result);
  };

  const generateCombination = (item1, item2) => {
    return `${item1} + ${item2} = Craft Result`;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar */}
        <div
          style={{
            width: '200px',
            padding: '20px',
            borderRight: '1px solid #ccc',
            overflowY: 'auto',
          }}
        >
          <h3>Items</h3>
          <DraggableItem name="Water" image="water.png" />
          <DraggableItem name="Fire" image="fire.png" />
          {/* Add more items if needed */}
        </div>

        {/* Drop Zone */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DropZone onDrop={handleDrop} />
        </div>
      </div>

      {/* Craft Result */}
      {craftResult && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#fff',
            padding: '10px 20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3>Craft Result: {craftResult}</h3>
        </div>
      )}
    </DndProvider>
  );
};

export default App;