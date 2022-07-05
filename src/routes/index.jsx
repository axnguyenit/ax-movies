import React, { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { MainLayout } from '../layouts';

// ----------------------------------------------------------------------

const Catalog = lazy(() => import('../pages/catalog'));
const Home = lazy(() => import('../pages/home'));
const MovieDetails = lazy(() => import('../pages/movie-details'));
const PlayMovie = lazy(() => import('../pages/play-movie'));
const PageNotFound = lazy(() => import('../pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: 'catalog',
          children: [
            { path: ':category', element: <Catalog /> },
            { path: ':category/:id', element: <MovieDetails /> },
            { path: ':category/:id/play', element: <PlayMovie /> },
          ],
        },
      ],
    },
    { path: '404', element: <PageNotFound /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
};
