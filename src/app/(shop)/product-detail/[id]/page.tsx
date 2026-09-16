import React from "react";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

interface ProductDetailPage {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: {
    url: string;
    alt: string;
  };
  reviews: {
    id: string;
    username: string;
    rating: number;
    description: string;
  }[];
  tags: string[];
}

interface ApiSingleResponse {
  data: ProductDetailPage;
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
    <div>
      <Link
        href="/"
        style={{ display: "block", height: "auto", marginBottom: "20px" }}
      >
        {" "}
        &larr; Back to products{" "}
      </Link>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      {product.discountedPrice !== product.price && (
        <p>Discounted price: {product.discountedPrice}</p>
      )}
      <img src={product.image.url} alt={product.image.alt} />
      <h2>Reviews:</h2>
      <ul>
        {product.reviews.map((review) => (
          <li key={review.id}>
            <p>
              <strong>{review.username}</strong> - Rating: {review.rating}
            </p>
            <p>{review.description} </p>
          </li>
        ))}
      </ul>
      <h2>Tags:</h2>
      <ul>
        {product.tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
      <AddToCartButton
        id={product.id}
        title={product.title}
        price={product.price}
        discountedPrice={product.discountedPrice}
      />
    </div>
  );
}
