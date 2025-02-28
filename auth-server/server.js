const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const pool = require("./db");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = process.env.SECRET_KEY;

const checkDbConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the PostgreSQL database");
    client.release(); // Освобождаем клиента после проверки подключения
  } catch (err) {
    console.error("Error connecting to the PostgreSQL database", err);
    process.exit(-1); // Завершаем процесс с ошибкой, если подключение невозможно
  }
};

// Запуск проверки подключения
checkDbConnection();

// Регистрация нового пользователя
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
    );
    const user = result.rows[0];
    const token = jwt.sign({ email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(201).json({ token, email: user.email, name: user.name });
    console.log("Register Succesful");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Пользователь с таким Email уже зарегистрирован" });
    console.log("Register Error");
  }
});

// Авторизация пользователя
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email: user.email }, SECRET_KEY, {
        expiresIn: "1h",
      });
      res.status(200).json({ token, email: user.email, name: user.name });
      console.log("Успешный вход");
    } else {
      res.status(401).json({ message: "Неверный email или пароль" });
      console.log("Неверный email или пароль");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
