"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="border-b border-gray-200 p-4 flex justify-center items-center">
      <nav className="flex gap-6">
        <Link href="/" className="hover:text-gray-600">
          Products
        </Link>{" "}
        <Link href="/contact" className="hover:text-gray-600">
          Contact
        </Link>{" "}
        <Link href="/cart" className="hover:text-gray-600">
          <FontAwesomeIcon icon={faCartShopping} /> ({cartCount})
        </Link>
      </nav>
    </header>
  );
}
