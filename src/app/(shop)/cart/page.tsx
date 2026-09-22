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
      <Link href="/" className="text-sm block mb-5 h-auto">
        {" "}
        &larr; Back to products{" "}
      </Link>
      <div className="mx-auto max-w-4xl border border-gray-200 rounded-lg p-6 shadow-md">
        <h1 className="text-center text-2xl font-bold mb-10 mt-8">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-center mb-8 text-lg">Your cart is empty.</p>
        ) : (
          <div>
            <ul className="mx-auto max-w-3xl space-y-4">
              {cart.map((item) => {
                const price =
                  item.discountedPrice !== item.price
                    ? item.discountedPrice
                    : item.price;

                return (
                  <li
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-6 shadow-md"
                  >
                    {/* Left side */}
                    <div className="flex items-center gap-6">
                      <img
                        src={item.image.url}
                        alt={item.image.alt}
                        className="mx-auto block h-32 w-32 rounded-xl object-cover"
                      />
                      <div>
                        <h2 className="mb-3 text-lg font-semibold">
                          {item.title}{" "}
                        </h2>
                        <p className="text-lg"> $ {price} </p>
                      </div>
                    </div>
                    {/* Right side */}
                    <div className="flex flex-col items-center gap-3">
                      <p className="text-sm font-semibold">Quantity</p>
                      <div className="flex rounded-lg border border-gray-300">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          -
                        </button>
                        <p className="border-x border-gray-300 px-5 py-2">
                          {item.quantity}{" "}
                        </p>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-lg border border-red-500 px-5 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer"
                      >
                        Remove item
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="mb-6 flex items-center justify-between m-4">
                <p className="text-lg font-semibold">Total Price: </p>
                <p className="text-xl font-semibold">
                  {" "}
                  $ {totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="flex gap-4 m-4">
                <button
                  onClick={() => clearCart()}
                  className="flex-1 rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-100 hover:text-black font-semibold cursor-pointer"
                >
                  Clear cart
                </button>
                <Link
                  href="/success"
                  className="flex-1 rounded-lg bg-gray-800 border border-white px-6 py-3 text-center text-white hover:bg-black font-semibold cursor-pointer"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
