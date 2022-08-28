import { Alert, Image, Button, Grid, Box, Text, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, 
    FormControl,
    FormLabel,
    Input,
    Textarea,

    
} from '@chakra-ui/react';
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { postOrder } from '../../api';
import { useBasket } from "../../context/BasketContext";
import { useAuth } from "../../context/AuthContext";


function Basket() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const [address, setAddress] = useState();

    const {items, removeFromBasket, emptyBasket} = useBasket();
    const {user} = useAuth();
    const total = items.reduce((acc, obj) => acc + obj.price, 0);

    const handleSubmitForm = async () => {
        const itemIds = items.map((item) => item._id);

        const input = {
            address,
            items: JSON.stringify(itemIds),
        };

        await postOrder(input);
        emptyBasket();
        onClose();
    }
    
  return (
    <Box p="5">
        {
            items.length < 1 && <Alert status="warning">
                Sepetinizde öğe yok.
            </Alert>
        }
        {
            items.length > 0 && <>
                <ul style={{listStyleType: "decimal"}}>
                <Grid templateColumns='repeat(3, 1fr)' gap={2}>
                    {items.map((item) => (
                    <li key={item._id}>
                        <Link to={`/product/${item._id}`} >
                            <Text fontSize="18">{item.title} - {item.price} TL</Text>
                            <Image htmlWidth={"200"} 
                            src={item.photos[0]}
                            alt="basket item"
                            loading='lazy'
                            />
                        </Link>

                        <Button mt="2"
                        size="sm"
                        colorScheme={"pink"}
                        onClick={() => removeFromBasket(item._id)}
                        >
                            Remove from basket
                        </Button>
                    </li>
                ))}
                </Grid>
                </ul>
            </>
        }
        <Box mt={"10"}>
            {items.length < 1 ? "" : `Total Price: ${total}` }
        </Box>
        <Button mt="2" size="sm" colorScheme={"green"} onClick={onOpen} >
            Order
        </Button>

        <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Textarea value={address} ref={initialRef} 
              placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => handleSubmitForm()}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Basket
