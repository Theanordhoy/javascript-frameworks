"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";

export default function AddToCartButton({
  id,
  title,
  description,
  image,
  price,
  discountedPrice,
  reviews,
  tags,
}: Product) {
  const { addToCart, cart } = useCart();
  console.log(cart);
  const handleClick = () => {
    const product: Product = {
      id,
      title,
      description,
      image,
      price,
      discountedPrice,
      reviews,
      tags,
    };

    addToCart(product);
  };

  return (
    <div className="mt-8 flex justify-center">
      <button
        onClick={handleClick}
        className="rounded-lg bg-black px-16 py-3 text-white transition hover:bg-gray-800 text-lg cursor-pointer"
      >
        Add to cart
      </button>
    </div>
  );
}
