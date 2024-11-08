import {useEffect, useState} from 'react';
import Header from './components/Header';
import Guitarra from './components/Guitarra';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCart from "./hooks/useCart.js";

function App() {

    const {
        data,
        carrito,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isCartEmpty,
        cartTotal
    } = useCart()

    return (
        <>
            <Header
                cart={carrito}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
                isCartEmpty={isCartEmpty}
                cartTotal={cartTotal}
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

            <ToastContainer/>

        </>
    );
}

export default App;