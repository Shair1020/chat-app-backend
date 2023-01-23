const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRouter);

const DB = process.env.MONGO_STRING.replace(
  "<PASSWORD>",
  process.env.MONGO_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("Connected to mongodb");
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: 🔥 ${process.env.PORT}`);
});
