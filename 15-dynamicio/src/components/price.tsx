import { Suspense } from "react";

import { getPrice } from "@/products";

import RequestTimeDelta from "@/components/request-time-delta";

async function PriceImpl({ id }: { id: number }) {
  const {
    requestTime,
    data: { price },
  } = await getPrice(id);

  return (
    <>
      <span className="text-lg font-bold">${price.toFixed(2)}</span>
      <span className="text-lg text-destructive font-bold ml-2">
        (
        <RequestTimeDelta
          name={`/product/${id}/price`}
          requestTime={requestTime}
        />
        )
      </span>
    </>
  );
}

export default function Price({ id }: { id: number }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PriceImpl id={id} />
    </Suspense>
  );
}
