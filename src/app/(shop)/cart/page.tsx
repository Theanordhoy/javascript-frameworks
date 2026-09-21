"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const totalPrice = cart.reduce((total, item) => {
    const price =
      item.discountedPrice !== item.price ? item.discountedPrice : item.price;

    return total + price * item.quantity;
  }, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.map((item) => {
          const price =
            item.discountedPrice !== item.price
              ? item.discountedPrice
              : item.price;

          return (
            <li key={item.id}>
              <h2>{item.title} </h2>
              <img
                src={item.image.url}
                alt={item.image.alt}
                className="mx-auto block mb-6 h-80 w-80  rounded-xl object-cover"
              />
              <p>{price} </p>
              <p>Quantity: {item.quantity} </p>
              <div>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
              </div>
              <div>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
              <div>
                <button onClick={() => removeFromCart(item.id)}>
                  Remove item
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={() => clearCart()}>Clear cart</button>
      </div>
      <div>
        <p>Total Price: {totalPrice}</p>
      </div>
      <Link href="/success">Checkout</Link>
    </div>
  );
}
