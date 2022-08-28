import React from 'react'
import { useParams } from "react-router-dom";
import { fetchProduct, updateProduct } from "../../../api";
import { useQuery } from "react-query";
import { Box, Text, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";
import { Formik, FieldArray } from "formik";
import { message } from "antd";
import validationSchema from "./validations";

function ProductDetail() {
    const { product_id } = useParams();

    // çekilen verilerin karışmaması için ikinci param verilir
    const { isLoading, isError, data, error } = useQuery(
        ["admin:product", product_id], 
        () => fetchProduct(product_id) );
    
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error</div> 
    }

    const handleSubmit = async (values, bag) => {
        // antd altından pop-up mesaj
        // verilen key aşağıda pop-up'ıngüncellenmesi için kullanılır
        message.loading({ content: "Loading...", key: "product_update"})
        try {
            await updateProduct(values, product_id);
            message.success({
                content: "Ürün başarıyla güncellendi.",
                key: "product_update",
                duration: 2 // 2 saniye sonra kaybolur
            })
        } catch (error) {
            message.error("Ürün güncellemesi başarısız.")
        }
    }


  return (
    <div>
      <Text fontSize={"2xl"}>Edit</Text>
      <Formik
      initialValues={{
        title: data.title,
        description: data.description,
        price: data.price,
        photos: data.photos,
      }}
      validationSchema = {validationSchema}
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
                                Update
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

export default ProductDetail
