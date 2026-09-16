import React from "react";
import Link from "next/link";

interface Product {
  id: string;
  image: { url: string; alt: string };
  title: string;
  price: number;
  discountedPrice: number;
  rating: number;
}

interface ApiResponse {
  data: Product[];
}

export default async function ProductsPage() {
  const response = await fetch("https://v2.api.noroff.dev/online-shop");

  if (!response.ok) {
    console.error("Failed to fetch products:", response.statusText);
    return <p>Failed to load products. Please try again.</p>;
  }

  const result: ApiResponse = await response.json();
  const products = result.data;

  return (
    <div>
      <h1>Products</h1>

      {products && products.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {products.map((product) => {
            const discount = Math.round(
              ((product.price - product.discountedPrice) / product.price) * 100
            );

            return (
              <li
                key={product.id}
                style={{
                  marginBottom: "20px",
                  padding: "10px",
                }}
              >
                <h2>{product.title}</h2>
                <img
                  src={product.image.url}
                  alt={product.image.alt || product.title}
                  style={{ maxWidth: "200px", height: "auto" }}
                />
                {product.discountedPrice !== product.price && (
                  <p>Discount:{discount}%</p>
                )}
                <p>Price: {product.price}</p>
                {product.discountedPrice !== product.price && (
                  <p>Discounted price: {product.discountedPrice}</p>
                )}
                <p>Rating: {product.rating}</p>
                <Link href={`/product-detail/${product.id}`}>See more</Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
