import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DashboardSidebar } from '../../components/dashboard/sidebar';
import { ModulesPage } from './modules';
import { OverviewPage } from './overview';

/**
 * Dashboard page.
 */
export const DashboardPage: FC = () => (
  <div className="flex md:flex-row flex-col md:divide-x-4 divide-neutral-500">
    <div className="flex-none h-full">
      <DashboardSidebar />
    </div>
    <div className="grow h-24 bg-red-300">
      <Routes>
        <Route index element={<OverviewPage />} />
        <Route path="modules" element={<ModulesPage />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </div>
    <div className="flex-none md:w-48 w-auto h-24 bg-green-300">
      Right bar
    </div>
  </div>
);
