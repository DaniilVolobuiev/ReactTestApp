import React from 'react';
import Home from './pages/Home';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import './App.scss';
import FullItem from './pages/FullItem';

function App() {
  const router = createHashRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/item/:id',
      element: <FullItem />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
