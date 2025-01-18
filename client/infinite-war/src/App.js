import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Types for drag-and-drop
const ItemTypes = { ITEM: 'item' };

const DraggableItem = ({ name, image }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ITEM,
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '10px',
        border: '1px solid black',
        cursor: 'move',
        textAlign: 'center',
      }}
    >
      <img src={image} alt={name} width="50px" />
      <p>{name}</p>
    </div>
  );
};

const DropZone = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ITEM,
    drop: (item) => onDrop(item.name),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        width: '250px',
        height: '250px',
        border: '2px solid black',
        backgroundColor: isOver ? 'lightgreen' : 'lightyellow',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30px',
      }}
    >
      <p>Drop here to combine</p>
    </div>
  );
};

const App = () => {
  const [craftResult, setCraftResult] = useState('');

  const handleDrop = (itemName) => {
    // Call a function to handle combining items and generating results
    const result = generateCombination(itemName, 'Fire'); // Placeholder for AI-driven function
    setCraftResult(result);
  };

  const generateCombination = (item1, item2) => {
    // Basic logic before AI. Use AI integration later
    return `${item1} + ${item2} = Craft Result`;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <DraggableItem name="Water" image="water.png" />
        <DraggableItem name="Fire" image="fire.png" />
      </div>

      <DropZone onDrop={handleDrop} />

      {craftResult && (
        <div style={{ marginTop: 30 }}>
          <h3>Craft Result: {craftResult}</h3>
        </div>
      )}
    </DndProvider>
  );
};

export default App;
