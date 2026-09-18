import React from "react";
import Link from "next/link";
import Search from "@/components/SearchBar";

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

export default async function ProductsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const response = await fetch("https://v2.api.noroff.dev/online-shop");

  if (!response.ok) {
    console.error("Failed to fetch products:", response.statusText);
    return <p>Failed to load products. Please try again.</p>;
  }

  const result: ApiResponse = await response.json();
  const products = result.data;
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="border border-gray-200 rounded-lg p-2 mb-4 mx-4">
        <Search placeholder="Search products..." />
      </div>

      <h1 className="mb-4 text-center">Products</h1>

      {filteredProducts && filteredProducts.length > 0 ? (
        <ul
          style={{ listStyle: "none", padding: 0 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {filteredProducts.map((product) => {
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
                className="border border-gray-200 rounded-lg shadow-md"
              >
                <h2 className="mb-2 font-semibold">{product.title}</h2>
                <div className="relative">
                  <img
                    src={product.image.url}
                    alt={product.image.alt || product.title}
                    className="object-cover rounded-lg w-52 h-52"
                  />
                  {product.discountedPrice !== product.price && (
                    <p className="absolute top-1 right-1 bg-red-700 p-2 rounded-lg">
                      {discount}%
                    </p>
                  )}
                </div>
                <div className="flex gap-4 items-center mt-2">
                  <p
                    className={
                      product.discountedPrice !== product.price
                        ? "text-lg line-through text-gray-500"
                        : "font-semibold"
                    }
                  >
                    $ {product.price}
                  </p>
                  {product.discountedPrice !== product.price && (
                    <p className="text-red-500 font-semibold">
                      $ {product.discountedPrice}
                    </p>
                  )}
                </div>
                <p className="text-sm">Rating: {product.rating}/5</p>
                <Link
                  href={`/product-detail/${product.id}`}
                  className="bg-green-800 p-2 rounded-lg text-white block text-center my-2 hover:bg-green-700"
                >
                  See more
                </Link>
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
