import React from 'react'
import { BrowserRouter as Router, Link, Routes, Route, useRoute, useMatch } from "react-router-dom";

import { Box } from "@chakra-ui/react";
import "./styles.css";
import Home from './Home';
import Products from './Products';
import Orders from './Orders';
function Admin() {
  return (
    <div>
      <nav>
        <ul className='admin-menu'>
            <li>
                <Link to={"/admin"}>Home</Link>
            </li>
            <li>
                <Link to={"/admin/orders"}>Orders</Link>
            </li>
            <li>
                <Link to={"/admin/products"}>Products</Link>
            </li>
        </ul>
      </nav>

      <Box mt="10">
      </Box>

    </div>
  )
}

export default Admin
