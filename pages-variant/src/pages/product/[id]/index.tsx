import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { Button } from "@/components/ui/button";

import { API_URL, getPrice, getProduct, getRelatedProducts } from "@/products";

import RequestTimeDelta from "@/components/request-time-delta";
import ProductCard from "@/components/product-card";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = +(context.params?.id ?? "");

  const [product, price, relatedProductIds] = await Promise.all([
    getProduct(id),
    getPrice(id),
    getRelatedProducts(id),
  ]);

  const relatedProductsData: Record<
    number,
    Awaited<ReturnType<typeof getProduct>>
  > = {};
  const relatedPriceData: Record<
    number,
    Awaited<ReturnType<typeof getPrice>>
  > = {};

  await Promise.all(
    relatedProductIds.data.relatedProducts.map(async (relatedId) => {
      const [productData, priceData] = await Promise.all([
        getProduct(relatedId),
        getPrice(relatedId),
      ]);
      relatedProductsData[relatedId] = productData;
      relatedPriceData[relatedId] = priceData;
    })
  );

  return {
    props: {
      product,
      price,
      relatedProductIds,
      relatedProductsData,
      relatedPriceData,
    },
  };
};

export default function ProductPage({
  product,
  price,
  relatedProductIds,
  relatedProductsData,
  relatedPriceData,
}: {
  product: Awaited<ReturnType<typeof getProduct>>;
  price: Awaited<ReturnType<typeof getPrice>>;
  relatedProductIds: Awaited<ReturnType<typeof getRelatedProducts>>;
  relatedProductsData: Record<number, Awaited<ReturnType<typeof getProduct>>>;
  relatedPriceData: Record<number, Awaited<ReturnType<typeof getPrice>>>;
}) {
  return (
    <div>
      <Head>
        <title>Pages Router Variant</title>
      </Head>

      <h2 className="text-3xl font-bold mb-4">{product.data.name}</h2>

      <div className="mb-4 text-2xl font-bold text-destructive">
        <RequestTimeDelta
          name={`/product/${product.data.id}`}
          requestTime={product.requestTime}
        />
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
          <p className="text-2xl font-bold mb-2">
            ${price.data.price.toFixed(2)}
          </p>
          <p className="text-2xl text-destructive font-bold">
            <RequestTimeDelta
              name={`/product/${product.data.id}/price`}
              requestTime={price.requestTime}
            />
            <div className="mt-5">
              <Button variant="secondary" className="w-full">
                Buy Now
              </Button>
            </div>
          </p>
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
            <ProductCard
              price={relatedPriceData[relatedId]}
              product={relatedProductsData[relatedId]}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
