import {useEffect, useMemo, useState} from "react";
import {toast} from "react-toastify";
import {db} from "../data/db.js";


function useCart() {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem("carrito")
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    const [data, setData] = useState([]);
    const [carrito, setCart] = useState(initialCart);

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }, [carrito]);

    function addToCart(item) {
        const itemExists = carrito.findIndex(guitar => guitar.id === item.id);

        if (itemExists === -1) { //no existe en el carrito
            item.quantity = 1
            setCart([...carrito, item]);

            toast.success(`¡${item.name} ha sido agregado al carrito!`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } else {
            const updatedCart = [...carrito]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        }
    }

    function removeFromCart(id, name) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
        toast.error(`¡${name} ha sido eliminado del carrito!`, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function increaseQuantity(id) {

        const MAX_ITEMS = 5

        const updatedCart = carrito.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item;
        })

        setCart(updatedCart)
    }

    function decreaseQuantity(id) {

        const MIN_ITEMS = 1

        const updatedCart = carrito.map(item => {

            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }

    useEffect(() => {
        setData(db);
    }, []);

    const isCartEmpty = useMemo(() => carrito.length === 0, [carrito])

    const cartTotal = useMemo(() => carrito.reduce((total, item) => total + (item.quantity * item.price), 0), [carrito]);


    return {
        data,
        carrito,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
            isCartEmpty,
        cartTotal
    }
}

export default useCart;