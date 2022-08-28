import { useState, createContext, useContext, useEffect } from "react";

const BasketContext = createContext();

// varsa item."basket" yoksa boş array
const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];

const BasketProvider = ({children}) => {
    const [items, setItems] = useState(defaultBasket);

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(items));
    }, [items]);

    const addToBasket = (data, findBasketItem) => {
        // sepete ekleme
        if(!findBasketItem){
            return setItems((prev) => [...prev, data]);
        }
        // sepetten çıkarma
        const filtered = items.filter((item) => item._id !== findBasketItem._id)
            setItems(filtered);
    }

    const removeFromBasket = (item_id) => {
        const filtered = items.filter((item) => item._id !== item_id);
        setItems(filtered);
    }

    const emptyBasket = () => {
        setItems([]);
    }

    const values= {
        items,
        setItems,
        addToBasket,
        removeFromBasket,
        emptyBasket,
    };

    return (
        <BasketContext.Provider value={values}> {children} </BasketContext.Provider>
    );
}

const useBasket = () => useContext(BasketContext);

export {BasketProvider, useBasket};