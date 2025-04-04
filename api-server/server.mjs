import express from "express";
import cors from "cors";

const products = [
  {
    id: 1,
    name: "Neuvo Console",
    price: 599.99,
    image: "/images/new-console.jpg",
    description: "The latest and greatest console from Neuvo",
    relatedProducts: [2, 3],
  },
  {
    id: 2,
    name: "Neuvo Controller",
    price: 69.99,
    image: "/images/new-controller.jpg",
    description: "The latest and greatest controller from Neuvo",
    relatedProducts: [1, 3],
  },
  {
    id: 3,
    name: "Neuvo Headset",
    price: 44.99,
    image: "/images/new-headset.jpg",
    description: "The latest and greatest headset from Neuvo",
    relatedProducts: [1, 2],
  },
  {
    id: 4,
    name: "Retro Console",
    price: 299.99,
    image: "/images/retro-console.jpg",
    description: "The latest and greatest retro console from Neuvo",
    relatedProducts: [1],
  },
];

const app = express();

app.use(cors());

app.use("/images", express.static("images"));

app.get("/api/products", (req, res) => {
  console.log(`${new Date().toISOString()}: /products`);

  res.send({
    requestTime: new Date().getTime(),
    data: products.map(({ id, name }) => ({ id, name })),
  });
});

app.get("/api/prices", (req, res) => {
  console.log(`${new Date().toISOString()}: /prices`);

  res.send({
    requestTime: new Date().getTime(),
    data: products.map(({ id, price }) => ({ id, price })),
  });
});

app.get("/api/products/:id", (req, res) => {
  console.log(`${new Date().toISOString()}: /products/${req.params.id}`);

  const product = products.find(({ id }) => id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).send("Product not found");
  }
  const { relatedProducts, price, ...rest } = product;
  res.send({
    requestTime: new Date().getTime(),
    data: {
      ...rest,
      imageWidth: 2392,
      imageHeight: 1344,
    },
  });
});

app.get("/api/products/:id/price", (req, res) => {
  console.log(`${new Date().toISOString()}: /products/${req.params.id}/price`);

  const product = products.find(({ id }) => id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).send("Product not found");
  }
  setTimeout(() => {
    res.send({
      requestTime: new Date().getTime(),
      data: { price: product.price },
    });
  }, 2000);
});

app.get("/api/products/:id/related", (req, res) => {
  console.log(
    `${new Date().toISOString()}: /products/${req.params.id}/related`
  );

  const product = products.find(({ id }) => id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).send("Product not found");
  }
  res.send({
    requestTime: new Date().getTime(),
    data: { relatedProducts: product.relatedProducts },
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
