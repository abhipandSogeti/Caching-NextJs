import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { API_URL, getProduct } from "@/products";

import RequestTimeDelta from "@/components/request-time-delta";
import Price from "@/components/price";

export default async function ProductCard({ id }: { id: number }) {
  const product = await getProduct(id);

  return (
    <div>
      <div className="mb-2 text-destructive font-bold text-xl">
        <RequestTimeDelta
          name={`/product/${id}`}
          requestTime={product.requestTime}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{product.data.name}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Price id={id} />
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
