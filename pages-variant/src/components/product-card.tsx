import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { API_URL, getPrice, getProduct } from "@/products";

import RequestTimeDelta from "@/components/request-time-delta";

type CardComponentProps = {
  price: Awaited<ReturnType<typeof getPrice>>;
  product: Awaited<ReturnType<typeof getProduct>>;
};

export default function ProductCard({ price, product }: CardComponentProps) {
  return (
    <div>
      <div className="mb-2 text-destructive font-bold text-xl">
        <RequestTimeDelta
          name={`/product/${product.data.id}`}
          requestTime={product.requestTime}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{product.data.name}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <span className="text-lg font-bold">
              ${price.data.price.toFixed(2)}
            </span>
            <span className="text-lg text-destructive font-bold">
              (
              <RequestTimeDelta
                name={`/product/${product.data.id}/price`}
                requestTime={price.requestTime}
              />
              )
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Image
              src={`${API_URL}${product.data.image}`}
              alt={product.data.name}
              width={product.data.imageWidth}
              height={product.data.imageHeight}
            />
          </div>
          <p className="mt-2 text-xl font-medium text-muted-foreground">
            {product.data.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
