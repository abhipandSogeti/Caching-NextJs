import type { Metadata } from "next";
import Link from "next/link";

import { getProducts } from "@/products";

import RequestTimeDelta from "@/components/request-time-delta";
import ProductCard from "@/components/product-card";

export const metadata: Metadata = {
  title: "App Router Variant",
};

export default async function Home() {
  const products = await getProducts();
  return (
    <main>
      <div className="mb-4 text-2xl font-bold text-destructive">
        <RequestTimeDelta name="/products" requestTime={products.requestTime} />
      </div>
      <div className="flex flex-wrap">
        {products.data.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="w-full md:w-1/2 lg:w-1/3 px-2"
          >
            <ProductCard id={product.id} />
          </Link>
        ))}
      </div>
    </main>
  );
}
