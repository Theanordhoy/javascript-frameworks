"use client";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="mx-auto max-w-4xl border border-gray-200 rounded-lg p-6 shadow-md text-center mt-20 bg-white">
      <h1 className="font-bold text-2xl mt-8"> Thank you!</h1>
      <p className="text-lg m-6">
        Your order is confirmed. You will receive a confirmation on your email.
      </p>
    </div>
  );
}
