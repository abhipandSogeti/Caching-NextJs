import { unstable_cacheLife as cacheLife } from "next/cache";

export const API_URL = "http://localhost:8080";

// Should be cached for 1 hour
export const getProducts = async (): Promise<{
  requestTime: number;
  data: {
    id: number;
    name: string;
  }[];
}> => {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`${API_URL}/api/products`);
  return await res.json();
};

// Should be cached for 1 minute
export const getProduct = async (
  id: number
): Promise<{
  requestTime: number;
  data: {
    id: number;
    name: string;
    description: string;
    image: string;
    imageWidth: number;
    imageHeight: number;
  };
}> => {
  "use cache";
  cacheLife("minutes");

  const res = await fetch(`${API_URL}/api/products/${id}`);
  return await res.json();
};

// Should NOT be cached
export const getPrice = async (
  id: number
): Promise<{
  requestTime: number;
  data: {
    price: number;
  };
}> => {
  const res = await fetch(`${API_URL}/api/prices`);
  const { requestTime, data } = await res.json();
  return {
    requestTime,
    data: { price: data.find((p: { id: number }) => p.id === id)?.price },
  };
};

// Should be cached for 1 hour
export const getRelatedProducts = async (
  id: number
): Promise<{
  requestTime: number;
  data: {
    relatedProducts: number[];
  };
}> => {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`${API_URL}/api/products/${id}/related`);
  return await res.json();
};
