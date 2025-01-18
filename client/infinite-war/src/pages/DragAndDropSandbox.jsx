import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useDrag, useDrop } from 'react-dnd';

// Define drag types
const ItemTypes = {
  SANDBOX_ITEM: 'sandboxItem'
};

// Draggable item component
const DraggableItem = ({ id, name, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SANDBOX_ITEM,
    item: { id, name, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      className={`p-4 mb-2 bg-white rounded-lg shadow cursor-move border 
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        hover:border-blue-500 transition-all`}
    >
      <p className="font-medium">{name}</p>
      <p className="text-sm text-gray-500">{type}</p>
    </div>
  );
};

// Sandbox item (dropped item)
const SandboxItem = ({ id, name, type, position }) => {
  return (
    <div
      className="absolute p-4 bg-white rounded-lg shadow border"
      style={{
        left: position.x,
        top: position.y
      }}
    >
      <p className="font-medium">{name}</p>
      <p className="text-sm text-gray-500">{type}</p>
    </div>
  );
};

// Main sandbox area
const SandboxArea = ({ onDrop, items }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.SANDBOX_ITEM,
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      const dropArea = document.getElementById('sandbox-area');
      const areaRect = dropArea.getBoundingClientRect();
      
      onDrop({
        ...item,
        position: {
          x: offset.x - areaRect.left,
          y: offset.y - areaRect.top
        }
      });
    }
  }));

  return (
    <div
      id="sandbox-area"
      ref={drop}
      className="relative w-full h-full bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
    >
      {items.map((item) => (
        <SandboxItem key={item.id} {...item} />
      ))}
    </div>
  );
};

// Sidebar with draggable items
const Sidebar = ({ items }) => {
  return (
    <Card className="w-64 h-full">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4">Available Items</h3>
        <Separator className="mb-4" />
        <ScrollArea className="h-[calc(100vh-12rem)]">
          {items.map((item) => (
            <DraggableItem key={item.id} {...item} />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

// Main component
const DragAndDropSandbox = () => {
  const [sandboxItems, setSandboxItems] = React.useState([]);
  
  const sidebarItems = [
    { id: '1', name: 'Rectangle', type: 'Shape' },
    { id: '2', name: 'Circle', type: 'Shape' },
    { id: '3', name: 'Triangle', type: 'Shape' },
    { id: '4', name: 'Text Box', type: 'Input' },
    { id: '5', name: 'Button', type: 'Control' },
    { id: '6', name: 'Image', type: 'Media' },
    { id: '7', name: 'Video', type: 'Media' },
    { id: '8', name: 'Chart', type: 'Visualization' },
    { id: '9', name: 'Table', type: 'Data' },
    { id: '10', name: 'Form', type: 'Container' }
  ];

  const handleDrop = (item) => {
    setSandboxItems([
      ...sandboxItems,
      {
        ...item,
        id: `${item.id}-${Date.now()}` // Ensure unique IDs for dropped items
      }
    ]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen p-4 gap-4">
        <div className="flex-1">
          <SandboxArea onDrop={handleDrop} items={sandboxItems} />
        </div>
        <Sidebar items={sidebarItems} />
      </div>
    </DndProvider>
  );
};

export default DragAndDropSandbox;