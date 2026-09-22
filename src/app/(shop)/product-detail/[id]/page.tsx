import React from "react";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { Product } from "@/types/product";

interface ApiSingleResponse {
  data: Product;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = id;
  const response = await fetch(
    `https://v2.api.noroff.dev/online-shop/${productId}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    console.error("Failed to fetch product data:", response.statusText);
    if (response.status === 404) {
      return <p>Product with ID {productId} not found.</p>;
    }
    console.error(
      `Failed to fetch product ${productId}: `,
      response.statusText,
    );
    return <p>Could not fetch product data. Try again later.</p>;
  }

  const result: ApiSingleResponse = await response.json();
  const product = result.data;

  if (!product) {
    return <p>Product is not available.</p>;
  }
  return (
    <div className="mx-auto">
      <Link href="/" className="text-sm block h-auto mb-5">
        {" "}
        &larr; Back to products{" "}
      </Link>
      <div className="mx-auto max-w-2xl border border-gray-200 p-8 shadow-md rounded-lg">
        <h1 className="mb-3 text-2xl font-bold text-center">{product.title}</h1>
        <img
          src={product.image.url}
          alt={product.image.alt}
          className="mx-auto block h-70 w-70 mb-4 rounded-xl object-cover md:h-140 md:w-140"
        />
        <div className="text-center space-y-4 mb-4">
          <p>{product.description}</p>
        </div>
        <div className="flex items-center gap-4 justify-center">
          <p
            className={
              product.discountedPrice !== product.price
                ? " line-through text-gray-500"
                : "text-xl font-semibold"
            }
          >
            $ {product.price}
          </p>

          {product.discountedPrice !== product.price && (
            <p className="text-xl font-semibold text-red-700">
              $ {product.discountedPrice}
            </p>
          )}
        </div>
        <div className="mt-2 ">
          <ul className="flex flex-wrap justify-center gap-2">
            {product.tags?.map((tag, index) => (
              <li
                key={index}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg text-sm"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <AddToCartButton
          id={product.id}
          title={product.title}
          image={product.image}
          price={product.price}
          discountedPrice={product.discountedPrice}
        />
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h2 className="mb-4 text-lg font-semibold">Reviews:</h2>
          <ul className="space-y-4">
            {product.reviews?.map((review) => (
              <li
                key={review.id}
                className="rounded-lg bg-gray-50 p-4 text-center"
              >
                <p className="text-black mb-2">
                  <strong>{review.username}</strong>
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Rating: {review.rating}/5
                </p>
                <p className="text-gray-700">{review.description} </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
