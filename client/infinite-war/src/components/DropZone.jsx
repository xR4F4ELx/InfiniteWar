import React from 'react';
import { useDrop } from 'react-dnd';
import DraggableItem from './DraggableItem';

const DropZone = ({ onDrop, items, onCombine }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item) => {
      if (!item.id) {
        onDrop(item);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`border-2 border-dashed p-4 w-full h-full ${
        isOver ? 'bg-blue-50' : 'bg-white'
      } flex flex-wrap content-start gap-2`}
    >
      {items.length === 0 && (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          Drop items here
        </div>
      )}
      {items.map((item) => (
        <DroppableItem key={item.id} item={item} onCombine={onCombine} />
      ))}
    </div>
  );
};

const DroppableItem = ({ item, onCombine }) => {
  const [, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (droppedItem) => {
      if (droppedItem.id !== item.id) {
        onCombine(item, droppedItem);
      }
    },
  }));

  return (
    <div ref={drop}>
      <DraggableItem name={item.name} image={item.image} id={item.id} />
    </div>
  );
};

export default DropZone;

