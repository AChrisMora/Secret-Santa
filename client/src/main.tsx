import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import CreateGroup from './pages/CreateGroup';
import RandomSelection from './pages/RandomSelection';

// Custom 404 Error Page
const NotFound: React.FC = () => (
  <div>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <a href="/">Go back to Home</a>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/', // Default page is Login
    element: <Login />,
    errorElement: <NotFound />, // Custom error page
  },
  {
    path: '/login', // Explicit login route
    element: <Login />,
  },
  {
    path: '/create-group',
    element: <CreateGroup />,
  },
  {
    path: '/random-selection',
    element: <RandomSelection />,
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}