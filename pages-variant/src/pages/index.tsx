import Head from "next/head";
import Link from "next/link";

import { getPrice, getProducts, getProduct } from "@/products";

import RequestTimeDelta from "@/components/request-time-delta";
import ProductCard from "@/components/product-card";

export const getStaticProps = async () => {
  const products = await getProducts();

  const productMap: Record<number, Awaited<ReturnType<typeof getProduct>>> = {};
  for (const product of products.data) {
    const productData = await getProduct(product.id);
    productMap[product.id] = productData;
  }

  const priceMap: Record<number, Awaited<ReturnType<typeof getPrice>>> = {};
  for (const product of products.data) {
    priceMap[product.id] = await getPrice(product.id);
  }

  return {
    props: {
      products,
      productMap,
      priceMap,
    },
  };
};

export default function Home({
  products,
  productMap,
  priceMap,
}: {
  products: Awaited<ReturnType<typeof getProducts>>;
  productMap: Record<number, Awaited<ReturnType<typeof getProduct>>>;
  priceMap: Record<number, Awaited<ReturnType<typeof getPrice>>>;
}) {
  return (
    <main>
      <Head>
        <title>Pages Router Variant</title>
      </Head>

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
            <ProductCard
              price={priceMap[product.id]}
              product={productMap[product.id]}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
