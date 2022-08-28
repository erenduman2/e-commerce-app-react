import React from 'react'
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

function Error404() {
  return (
    <Alert status='error'>
        <AlertIcon />
        <AlertTitle>Error404</AlertTitle>
        <AlertDescription>Aradığınız sayfa bulunamadı.</AlertDescription>
    </Alert>
  )
}

export default Error404
