import React from 'react'
import { FormControl, Box, Flex, Heading, 
FormLabel, 
Input, 
Button,
Alert
} from '@chakra-ui/react'
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetchLogin } from "../../../api";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


// console.log(fetchLogin);

function Signin() {
  const history = useNavigate();
  const { login, loggedIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    // values -> fomrdaki datalar, bag formda yapılabilecek işlemleri sağlar(form reset)
    onSubmit: async (values, bag) => {
      try{
        const loginResponse = await fetchLogin({email: values.email, password: values.password});
        login(loginResponse);
        history("/profile");
      }catch(e){
        // console.log("error",e.response.data.message);
        bag.setErrors({ general: e.response.data.message })
      }
    },
  });



  return (
    <div>
      <Flex align="center" width="full" justifyContent="center" >
        {/* pt-> padding-top */}
        <Box pt="10">
          <Box textAlign="center">
            <Heading>Sign In</Heading>
          </Box>
          <Box my={5}>
            {
              formik.errors.general && (
                <Alert status='error'>
                  {formik.errors.general}
                </Alert>
              )
            }
          </Box>
          <Box my={5} textAlign="left" >
            <form onSubmit={formik.handleSubmit} >
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input 
                name="email" 
                onChange={formik.handleChange} 
                // odak üzerinden gittiğinde farketmek için
                onBlur={formik.handleBlur}
                value={formik.values.email}
                // formik.errors.email true veya false döner
                isInvalid={formik.touched.email && formik.errors.email}
                />
              </FormControl>

              <FormControl mt="4" >
                <FormLabel>Password</FormLabel>
                <Input name="password" 
                type={"password"} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                value={formik.values.password}
                isInvalid={formik.touched.password && formik.errors.password}
                />
              </FormControl>

              {/* width="full" -> bulunduğu alanı tamamen kaplamasıiçin */}
                <Button mt="4" width="full" type="submit" >Sign In</Button>

            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default Signin
