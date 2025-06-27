

import { RouteObject } from 'react-router-dom';
import Layout from '../layouts/Layout';
import PageNotFoundView from '../compoments/PageNotFoundView';
import BlogList from '../pages/BlogList';
import BlogDetail from '../pages/BlogDetail';


const Routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <BlogList />,
      },
      {
        path: 'blog/:id',
        element: <BlogDetail />,
      },
    ],
  },
  {
    path: '*',
    element: <PageNotFoundView />,
  },
];

  export default Routes;