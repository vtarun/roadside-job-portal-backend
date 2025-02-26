const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoutes = require("./Routes/authRoute");
const jobRoutes = require("./Routes/jobRoutes");
const companyRoutes = require("./Routes/companyRoutes");
const userRoutes = require("./Routes/userRoutes");
const savedJobRoutes = require("./Routes/savedJobRoutes");
const applicationRoutes = require("./Routes/applicationRoutes");
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
    // origin: ["http://localhost:5173", "http://192.168.1.5:5173"],
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth", authRoutes);
app.use("/profile", userRoutes)
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url} from ${req.ip}`);
  next();
});
app.use("/jobs", jobRoutes);
app.use("/saved-jobs", savedJobRoutes)
app.use("/companies", companyRoutes);
app.use("/applications", applicationRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${4000}`);
});