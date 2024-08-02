import CDPlayer from '../components/CDPlayer';
import Home from '../components/Home';

type Route = {
  path: string;
  element: JSX.Element;
};

export const routes: Route[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/test',
    element: <CDPlayer />,
  },
];
