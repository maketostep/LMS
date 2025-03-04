const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const pool = require("./db");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Проверка подключения к БД
const checkDbConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the PostgreSQL database");
    client.release();
  } catch (err) {
    console.error("Error connecting to the PostgreSQL database", err);
    process.exit(-1);
  }
};

checkDbConnection();

// Маршруты
app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
