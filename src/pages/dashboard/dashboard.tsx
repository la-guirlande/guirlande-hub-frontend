import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

/**
 * Dashboard page.
 */
export const DashboardPage: FC = () => (
  <div className="flex md:flex-row flex-col">
    <div className="flex-none md:w-48 w-auto h-24 bg-gray-300">
      Sidebar
    </div>
    <div className="grow h-24 bg-red-300">
      <Routes>
        <Route index element={<h1>General</h1>} />
        <Route path="modules" element={<h1>Modules</h1>} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </div>
    <div className="flex-none md:w-48 w-auto h-24 bg-green-300">
      Right bar
    </div>
  </div>
);
