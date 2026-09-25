"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import { ToastContainer, toast } from "react-toastify";

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
  const { addToCart } = useCart();
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
    toast.success(`${product.title} added to cart!`, {
      autoClose: 4000,
    });
  };

  return (
    <div className="mt-8 flex justify-center">
      <button
        onClick={handleClick}
        className="rounded-lg border border-white bg-black px-16 py-3 text-white transition hover:bg-gray-900 text-lg cursor-pointer"
      >
        Add to cart
      </button>
      <ToastContainer />
    </div>
  );
}
