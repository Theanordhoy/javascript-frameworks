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
