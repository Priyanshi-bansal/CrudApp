import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import Register from './components/register.js';
import { createBrowserRouter,
  RouterProvider,} from 'react-router-dom'
  import Edit from './components/Edit.js';
  import Detail from './components/Detail.js';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/edit/:id",
      element: <Edit />,
    },
    {
      path: "/view/:id",
      element: <Detail />,
    },
  ]);
  return (
    <>
    <Navbar />
    <RouterProvider router={router} />
    </>
    
  );
}

export default App;
