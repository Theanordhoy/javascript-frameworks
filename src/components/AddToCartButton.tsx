"use client";

interface AddToCartButtonProps {
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
}

export default function AddToCartButton({
  id,
  title,
  price,
  discountedPrice,
}: AddToCartButtonProps) {
  const handleClick = () => {
    console.log("Button clicked!");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    cart.push({
      id,
      title,
      price,
      discountedPrice,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return <button onClick={handleClick}>Add to cart</button>;
}
