const express = require("express");
const { connectToServer } = require("./config/connect");
const cors = require("cors");
import postRoutes from "./routes/postRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", postRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Node.js TypeScript API!");
});

app.use((err, req, res, nextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
  connectToServer();
});
