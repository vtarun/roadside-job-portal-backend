const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoutes = require("./Routes/authRoute");
const jobRoutes = require("./Routes/jobRoutes");
const companyRoutes = require("./Routes/companyRoutes");
const userRoutes = require("./Routes/userRoutes");
// const savedJobRoutes = require("./routes/savedJobRoutes");
const { MONGO_URL, PORT, ORIGIN  } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", userRoutes)
app.use("/jobs", jobRoutes);
app.use("/companies", companyRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${4000}`);
});