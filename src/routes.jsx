import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "./components/Main";
import Repositorio from "./components/Repositorio";



  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home/>
      ),
    },
    {
      path: "/repository/:repository",
      element: (
        <Repositorio/>
      ),
    }
  ]);



  export default router;


  
