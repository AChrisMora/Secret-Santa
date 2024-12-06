import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import the main app layout and pages
import App from './App';
import Login from './pages/Login';
import RandomSelection from './pages/RandomSelection';
import CreateGroup from './pages/CreateGroup';
import SelectDate from './pages/SelectDate';

// Define the router with routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
  
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/create-group',
        element: <CreateGroup />,
      },
      {
        path: '/select-date',
        element: <SelectDate />,
      },
      {
        path: '/random-selection',
        element: <RandomSelection />,
      },
    ],
  },
]);

// Render the React application
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}