import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ name, image, id = null }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { name, image, id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex items-center justify-start p-2 mb-2 border rounded-md cursor-pointer ${
        isDragging ? 'bg-blue-100' : 'bg-white'
      }`}
      style={{ minWidth: '60px', maxWidth: '100px', height: '50px' }}
    >
      <img src={image || "/placeholder.svg"} alt={name} className="w-8 h-8 mr-2" />
      <p className="text-sm truncate">{name}</p>
    </div>
  );
};

export default DraggableItem;

