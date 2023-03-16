const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbconnect = require("./dbconnect");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const cloudinary = require("cloudinary");
const morgan = require("morgan");
dotenv.config();
app.use(express.json({ limit: "10mb" }));

const cors = require("cors");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(morgan("common"));
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// app.use("/", () => {
//   console.log("This is the server");
// });
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

dbconnect();
app.listen(5000, () => {
  console.log("Working server");
});
