import React, { useState } from 'react';
import DraggableItem from '../components/DraggableItem';
import DropZone from '../components/DropZone';
import { items, combinations } from '../data/gameData';

const DragAndDropSandbox = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [craftResult, setCraftResult] = useState('');

  const handleDrop = (item) => {
    setDroppedItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.name === item.name);
      if (existingItem) {
        return prevItems;
      }
      return [...prevItems, { ...item, id: `${item.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` }];
    });
  };

  const handleCombine = (item1, item2) => {
    const combination = combinations.find(
      (c) =>
        (c.ingredients.includes(item1.name) && c.ingredients.includes(item2.name)) ||
        (c.ingredients.includes(item2.name) && c.ingredients.includes(item1.name))
    );

    if (combination) {
      setDroppedItems((prevItems) => [
        ...prevItems.filter((item) => item.id !== item1.id && item.id !== item2.id),
        { name: combination.result, image: `${combination.result.toLowerCase()}.png`, id: `${combination.result}-${Date.now()}` },
      ]);
      setCraftResult(`${item1.name} + ${item2.name} = ${combination.result}`);
    } else {
      setCraftResult(`${item1.name} and ${item2.name} cannot be combined.`);
    }
  };

  return (
    <div className="flex h-screen">
  <div className="w-64 p-4 border-r border-gray-200 overflow-y-auto">
    <h3 className="text-lg font-semibold mb-4">Items</h3>
    {items.map((item) => (
      <DraggableItem key={item.name} name={item.name} image={item.image} />
    ))}
  </div>

  <div className="flex-1 p-4 overflow-auto">
    <DropZone onDrop={handleDrop} items={droppedItems} onCombine={handleCombine} />
  </div>

  {craftResult && (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white p-4 border border-gray-200 rounded-md shadow-md">
      <h3 className="text-lg font-semibold">Craft Result: {craftResult}</h3>
    </div>
  )}
</div>
  );
};

export default DragAndDropSandbox;

