import express from "express";
import cors from "cors";

const products = [
  {
    id: 1,
    name: "Bar Chart Visual",
    price: 120,
    image: "/images/chart (1).svg",
    description: "A bar chart with customizable bars and colors",
    relatedProducts: [2, 3],
  },
  {
    id: 2,
    name: "Line Chart Visual",
    price: 110,
    image: "/images/chart (2).svg",
    description: "A line chart for trend analysis over time",
    relatedProducts: [1, 3],
  },
  {
    id: 3,
    name: "Pie Chart Visual",
    price: 90,
    image: "/images/chart (3).svg",
    description: "A pie chart for proportional data representation",
    relatedProducts: [1, 2],
  },
  {
    id: 4,
    name: "Scatter Plot Visual",
    price: 130,
    image: "/images/chart (4).svg",
    description: "A scatter plot for data distribution analysis",
    relatedProducts: [5, 6],
  },
  {
    id: 5,
    name: "Radar Chart Visual",
    price: 140,
    image: "/images/chart (5).svg",
    description: "A radar chart for multi-dimensional data comparison",
    relatedProducts: [4, 6],
  },
  {
    id: 6,
    name: "Heatmap Visual",
    price: 150,
    image: "/images/chart (6).svg",
    description: "A heatmap for intensity-based data visualization",
    relatedProducts: [4, 5],
  },
  {
    id: 7,
    name: "Bubble Chart Visual",
    price: 160,
    image: "/images/chart (7).svg",
    description: "A bubble chart for multi-variable data representation",
    relatedProducts: [5, 6],
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
