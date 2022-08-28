import React from 'react'
import {Box, Image, Button} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import moment from "moment";
import { useBasket } from "../../context/BasketContext";

function Card({item}) {

    const {addToBasket, items} = useBasket();
    const findBasketItem = items.find((basket_item) => basket_item._id === item._id)

  return (
    // oveflow="hidden"-> taşan kısımları gizlemek için, p-> padding
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden " >
        <Link to={`/product/${item._id}`}>
            {/* loading="lazy" -> görsel yüklenirken yok gözükmemesi için */}
            <Image src={item.photos[0]} alt="product" loading='lazy' />
            <Box p="6">
                {/* d-> display */}
                <Box d="plex" alignItems="baseline">
                    {moment(item.createdAt).format("DD/MM/YYYY")}
                </Box>
                {/* mt-> margin:top, as="h4" -> h4 olarak kullan*/}
                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                    {item.title}
                </Box>
                <Box>
                    {item.price}
                </Box>
            </Box>
        </Link>
        <Button 
        colorScheme={findBasketItem ? "pink" : "green"}
        variant="solid"
        onClick={() => addToBasket(item, findBasketItem)}
        >
            {
                findBasketItem ? "Remove from basket" : "Add to basket"
            }
            
        </Button>
    </Box>
  )
}

export default Card
