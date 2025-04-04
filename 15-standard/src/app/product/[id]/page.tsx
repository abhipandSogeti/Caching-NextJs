import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";

import { getRelatedProducts, getProduct, API_URL } from "@/products";

import RequestTimeDelta from "@/components/request-time-delta";
import ProductCard from "@/components/product-card";
import Price from "@/components/price";

export const metadata: Metadata = {
  title: "App Router Variant",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(+id);
  const relatedProductIds = await getRelatedProducts(+id);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">{product.data.name}</h2>

      <div className="mb-4 text-2xl font-bold text-destructive">
        <RequestTimeDelta name="Product" requestTime={product.requestTime} />
      </div>

      <div className="flex">
        <div className="w-3/5 px-2">
          <Image
            src={`${API_URL}${product.data.image}`}
            alt={product.data.name}
            width={product.data.imageWidth}
            height={product.data.imageHeight}
          />
          <div className="mt-5 text-lg">{product.data.description}</div>
        </div>
        <div className="w-2/5 px-2">
          <Price id={+id} />
          <div className="mt-5">
            <Button variant="secondary" className="w-full">
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold my-4">Related Products</h2>
      <div className="mb-4 text-2xl font-bold text-destructive">
        <RequestTimeDelta
          name="Related Products"
          requestTime={relatedProductIds.requestTime}
        />
      </div>

      <div className="flex flex-wrap">
        {relatedProductIds.data.relatedProducts.map((relatedId) => (
          <Link
            href={`/product/${relatedId}`}
            key={relatedId}
            className="w-full md:w-1/2 lg:w-1/3 px-2"
          >
            <ProductCard id={relatedId} />
          </Link>
        ))}
      </div>
    </div>
  );
}
