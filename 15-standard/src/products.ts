export const API_URL = "http://localhost:8080";

// Should be cached for 1 hour
export const getProducts = async (): Promise<{
  requestTime: number;
  data: {
    id: number;
    name: string;
  }[];
}> => {
  const res = await fetch(`${API_URL}/api/products`, {
    cache: "force-cache",
    next: {
      revalidate: 3600,
    },
  });
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
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    cache: "force-cache",
    next: {
      revalidate: 60,
    },
  });
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
  const res = await fetch(`${API_URL}/api/products/${id}/price`);
  return await res.json();
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
  const res = await fetch(`${API_URL}/api/products/${id}/related`, {
    cache: "force-cache",
    next: {
      revalidate: 3600,
    },
  });
  return await res.json();
};
