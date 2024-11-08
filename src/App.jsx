import {useEffect, useState} from 'react';
import Header from './components/Header';
import Guitarra from './components/Guitarra';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {db} from './data/db';

function App() {
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

    function decreaseQuantity(id){

        const MIN_ITEMS = 1

        const updatedCart = carrito.map( item => {

            if(item.id === id && item.quantity > MIN_ITEMS){
                return {
                    ...item,
                    quantity : item.quantity - 1
                }
            }
            return item
        } )
        setCart(updatedCart)
    }

    function clearCart(){
        setCart([])
    }

    useEffect(() => {
        setData(db);
    }, []);

    const notify = () => toast("Wow so easy !");

    return (
        <>
            <Header
                cart={carrito}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart = {clearCart}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>
                <div className="row mt-5">
                    {data.map((guitar) => (
                        <Guitarra
                            key={guitar.id}
                            guitar={guitar}
                            cart={carrito}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </main>
            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>

            <ToastContainer />

        </>
    );
}

export default App;