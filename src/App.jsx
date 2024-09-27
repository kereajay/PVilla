import { createContext, useEffect, useReducer, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Villa from "./Components/Villa";
import Cart from "./Components/Cart";
import Navbar from "./Components/Navbar";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const usercontext = createContext();
const initialstate = {
  favs: [],
};
const reducerfn = (state, action) => {
  switch (action.type) {
    case "addfav":
      
      return {
        ...state,
        favs: [...state.favs, action.payload],
      };
      case "remove":
        return{
          ...state,
          favs:state.favs.filter((item,index)=>item.id!=action.payload)
        }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(
    reducerfn,
    JSON.parse(localStorage.getItem("favsl")) || initialstate
  );
  useEffect(() => {
    localStorage.setItem("favsl", JSON.stringify(state));
  }, [state]);

  return (
    <>
      <usercontext.Provider value={{state,dispatch}}>
        <BrowserRouter>
        <Navbar />
        <Routes>
           <Route path="/" element={<Villa/>}/>
           <Route path="/cart" element={<Cart/>}/>
        </Routes>
        </BrowserRouter>
        <ToastContainer/>
        
        
      </usercontext.Provider>
    </>
  );
}

export default App;
