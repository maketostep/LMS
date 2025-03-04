const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create(email, hashedPassword);
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res
      .status(201)
      .json({ token, email: user.email, name: user.name, role: user.role });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при регистрации", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res
        .status(200)
        .json({ token, email: user.email, name: user.name, role: user.role });
    } else {
      res.status(401).json({ message: "Неверный email или пароль" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка при входе", error: error.message });
  }
};
