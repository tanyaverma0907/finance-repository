import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import { DashboardPage } from '../../app/pages/dashboard/DashboardPage';
import { TransactionsPage } from '../../app/pages/transactions/TransactionsPage';
import { InsightsPage } from '../../app/pages/insights/InsightsPage';

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/insights" element={<InsightsPage />} />
    </Route>
  </Routes>
);