import React from "react";
import Link from "next/link";
import Search from "@/components/SearchBar";
import { Product } from "@/types/product";

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
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.tags?.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase()),
      ),
  );

  return (
    <div>
      <div>
        <Search placeholder="Search products..." />
      </div>

      <h1 className="mb-10 text-2xl font-bold text-center">Products</h1>

      {filteredProducts && filteredProducts.length > 0 ? (
        <ul
          style={{ listStyle: "none", padding: 0 }}
          className="flex flex-wrap gap-10 justify-center"
        >
          {filteredProducts.map((product) => {
            const discount = Math.round(
              ((product.price - product.discountedPrice) / product.price) * 100,
            );

            return (
              <li
                key={product.id}
                className="border border-gray-200 rounded-lg shadow-xl bg-white px-5 py-4"
              >
                <h2 className="mb-2 font-semibold">{product.title}</h2>
                <div className="relative">
                  <img
                    src={product.image.url}
                    alt={product.image.alt || product.title}
                    className="object-cover rounded-lg w-52 h-52"
                  />
                  {product.discountedPrice !== product.price && (
                    <p className="absolute top-1 right-1 text-white font-semibold bg-red-800 p-1.5 rounded-lg">
                      {discount}%
                    </p>
                  )}
                </div>
                <div className="flex gap-4 items-center mt-2">
                  <p
                    className={
                      product.discountedPrice !== product.price
                        ? " line-through text-gray-500"
                        : "font-semibold text-lg"
                    }
                  >
                    $ {product.price}
                  </p>
                  {product.discountedPrice !== product.price && (
                    <p className="text-red-700 text-lg font-semibold">
                      $ {product.discountedPrice}
                    </p>
                  )}
                </div>
                <p className="text-sm">Rating: {product.rating}/5</p>
                <div className="my-3 ">
                  <ul className="flex flex-wrap justify-end gap-2">
                    {product.tags?.map((tag, index) => (
                      <li
                        key={index}
                        className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded-lg text-xs"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/product-detail/${product.id}`}
                  className="bg-black border border-white p-2 rounded-lg text-white block text-center my-2 hover:bg-gray-900"
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
