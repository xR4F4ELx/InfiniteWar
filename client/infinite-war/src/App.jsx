import React from 'react';
import { createRoot } from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CraftingGame from './pages/DragAndDropSandbox';
import './styles/tailwind.css';

import './index.css'; // Make sure to create this file for global styles

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <h1 className="text-2xl font-bold mb-4">Crafting Game</h1>
        <CraftingGame />
      </div>
    </DndProvider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

export default App;

