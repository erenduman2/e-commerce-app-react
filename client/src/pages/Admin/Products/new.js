import React from 'react'
import { useParams } from "react-router-dom";
import { fetchProduct, updateProduct, postProduct } from "../../../api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Box, Text, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";
import { Formik, FieldArray } from "formik";
import { message } from "antd";
import newProductValidationSchema from "./validations";

function NewProduct() {
    const queryClient = useQueryClient();

    const newProductMutation = useMutation(postProduct, {
        onSuccess: () => queryClient.invalidateQueries("admin:products"),
      });

    const handleSubmit = async (values, bag) => {

        // values.photos = JSON.stringify(values.photos);

        const newValues = {
            ...values,
            photos: JSON.stringify(values.photos),
        } 
        console.log(values);
        message.loading({ content: "Loading...", key: "product_update"});

        newProductMutation.mutate(newValues,{
            onSuccess: () => {
              console.log("success");
              // queryClient.invalidateQueries("admin:products");

              message.success({
                content: "Ürün başarıyla güncellendi.",
                key: "product_update",
                duration: 2 // 2 saniye sonra kaybolur
            })
            }
          });

    }

  return (
    <div>
      <Text fontSize={"2xl"}>New Product</Text>
      <Formik
      initialValues={{
        title: "asdasdasdasd",
        description: "adsadasd",
        price: "123",
        photos: [],
      }}
      validationSchema = {newProductValidationSchema}
      onSubmit={handleSubmit}
      >
        {
            // formik içindeki veriler alındı
            ({handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting}) => <>

                <Box>
                    <Box m="5" textAlign={"left"}>
                        <form onSubmit={handleSubmit}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                    <Input
                                        name='title'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title}
                                        // form submit ediliyorsa input disable olur
                                        disabled={isSubmitting}
                                        isInvalid={touched.title && errors.title}
                                    ></Input>
                            </FormControl>
                            <FormControl mt={"4"}>
                                <FormLabel>Description</FormLabel>
                                    <Textarea
                                        name='description'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        // form submit ediliyorsa Textarea disable olur
                                        disabled={isSubmitting}
                                        isInvalid={touched.description && errors.description}
                                    ></Textarea>
                            </FormControl>
                            <FormControl mt={"4"}>
                                <FormLabel>Price</FormLabel>
                                    <Input
                                        name='price'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price}
                                        // form submit ediliyorsa input disable olur
                                        disabled={isSubmitting}
                                        isInvalid={touched.price && errors.price}
                                    ></Input>
                            </FormControl>
                            <FormControl mt={"4"}>
                                <FormLabel>Photos</FormLabel>
                                    <FieldArray
                                        name='photos'
                                        render={(arrayHelpers) => (

                                            <div>
                                                {
                                                    values.photos && values.photos.map(
                                                        (photo, index) => (
                                                            <div key={index}>
                                                                <Input
                                                                    name={`photos.${index}`}
                                                                    value={photo}
                                                                    disabled={isSubmitting}
                                                                    onChange={handleChange}
                                                                    width="3xl"
                                                                />

                                                                <Button 
                                                                ml="4" 
                                                                type="button"
                                                                colorScheme="red"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                                >Remove</Button>
                                                                
                                                                
                                                            </div>
                                                        ))}
                                                        <Button mt="5"
                                                            onClick={() => arrayHelpers.push("")}
                                                        >
                                                            Add a photo
                                                        </Button>


                                            </div>
                                        )}
                                    ></FieldArray>
                            </FormControl>
                            <Button mt="4" 
                            width={"full"}
                            type="submit"
                            isLoading={isSubmitting}
                            >
                                Save
                            </Button>
                        </form>
                    </Box>
                </Box>

            </>
        }

      </Formik>
    </div>
  )
}

export default NewProduct
