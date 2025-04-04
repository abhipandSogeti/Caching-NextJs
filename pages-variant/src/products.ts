export const API_URL = "http://localhost:8080";

export const getProducts = async (): Promise<{
  requestTime: number;
  data: {
    id: number;
    name: string;
  }[];
}> => {
  const res = await fetch(`${API_URL}/api/products`);
  return await res.json();
};

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
  const res = await fetch(`${API_URL}/api/products/${id}`);
  return await res.json();
};

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

export const getRelatedProducts = async (
  id: number
): Promise<{
  requestTime: number;
  data: {
    relatedProducts: number[];
  };
}> => {
  const res = await fetch(`${API_URL}/api/products/${id}/related`);
  return await res.json();
};
