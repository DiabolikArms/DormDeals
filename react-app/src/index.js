// src/index.jsx or src/main.jsx
import './index.css';
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddProduct from './components/AddProduct';
import LikedProducts from './components/LikedProducts';
import ProductDetail from './components/ProductDetail';
import CategoryPage from './components/CategoryPage';
import MyProducts from './components/MyProducts';
import MyProfile from './components/MyProfile';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>,
  },
  {
    path: "/category/:catName",
    element: <Layout><CategoryPage /></Layout>,
  },
  {
    path: "/about",
    element: <Layout><div>About</div></Layout>,
  },
  {
    path: "/login",
    element: <Layout><Login /></Layout>,
  },
  {
    path: "/signup",
    element: <Layout><Signup /></Layout>,
  },
  {
    path: "/add-product",
    element: <Layout><AddProduct /></Layout>,
  },
  {
    path: "/liked-products",
    element: <Layout><LikedProducts /></Layout>,
  },
  {
    path: "/my-products",
    element: <Layout><MyProducts /></Layout>,
  },
  {
    path: "/product/:productId",
    element: <Layout><ProductDetail /></Layout>,
  },
  {
    path: "/my-profile",
    element: <Layout><MyProfile /></Layout>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
