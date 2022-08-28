import { addScaleCorrector } from 'framer-motion';
import React from 'react'
import { useAuth } from "../../context/AuthContext";
import { Text, Button } from "@chakra-ui/react";
import { useHistory, Link } from "react-router-dom";

function Profile() {
    // let history = useHistory();
    const {user, logout} = useAuth();
    
    const handleLogout = async () => {
        logout(() => {
            // history.push("/")
        });
    };

  return (
    <div>
      <Text fontSize={"22px"} >Profile</Text>
      <code>
        {JSON.stringify(user)}
      </code>

        <br /><br />
      <Link to="/">
        <Button colorScheme={"pink"}
        variant="solid"
        onClick={handleLogout}
        >
        Logout
        </Button>
      </Link>
    </div>
  )
}

export default Profile
