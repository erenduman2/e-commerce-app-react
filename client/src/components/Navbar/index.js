import React from 'react'
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button, ButtonGroup } from '@chakra-ui/react'
// context
import { useAuth } from "../../context/AuthContext";
import { useBasket } from "../../context/BasketContext";

function Navbar() {

  const {loggedIn, user} = useAuth();
  const {items} = useBasket();
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">eCommerce</Link>
        </div>

        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>

      </div>
      <div className={styles.right}>
        {
          !loggedIn && (
            <>
            <Link to="/signup">
              <Button colorScheme='pink'>Register</Button>
            </Link>

            <Link to="/login">
              <Button colorScheme='pink'>Login</Button>
            </Link>
            </>
          )
        }

        {
          loggedIn && (
            <>
            {
              items.length > 0 && (
                <Link to={"/basket"} >
                  <Button colorScheme="pink" variant="outline" >
                    Basket ({items.length})
                  </Button>
                </Link>
              )
              
            }

            {
              user?.role === "admin" && (
                <Link to="/admin">
                  <Button colorScheme={"pink"} variant="ghost">
                    Admin
                  </Button>
                </Link>
              )
            }

            <Link to="/profile">
              <Button colorScheme='pink'>Profile</Button>
            </Link>
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar