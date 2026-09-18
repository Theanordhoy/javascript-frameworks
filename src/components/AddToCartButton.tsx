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

  return <button onClick={handleClick}>Add to cart</button>;
}
