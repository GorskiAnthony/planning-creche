const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const RegisterSchema = require("../services/schema/RegisterSchema");
const LoginSchema = require("../services/schema/LoginSchema");
const prisma = require("../services/prisma");

class AuthController {
  // Method to register a new user
  static async register(req, res) {
    try {
      // Je vérifie que les données envoyées sont valides
      const { name, email, password, repeat_password } = req.body;
      const { error } = RegisterSchema.validate(
        { name, email, password, repeat_password },
        { abortEarly: false }
      );
      // Si une erreur est survenue, je renvoie le message d'erreur
      if (error) {
        return res.status(422).json({ validationErrors: error.details });
      } else {
        // Sinon, si tout va bien, je hash le mot de passe et save le user
        const hash = await bcrypt.hash(password, 10);
        await prisma.user.create({
          data: {
            fullname: name,
            email,
            password: hash,
          },
        });
        res.status(200).json({ message: "Youhou ! Nouvel utilisateur" });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Method to login a user
  static async login(req, res) {
    try {
      // Je récupère les données envoyées
      const { email, password } = req.body;
      // Je vérifie que les données sont valides
      const { error } = LoginSchema.validate(
        { email, password },
        { abortEarly: false }
      );
      if (error) {
        return res.status(422).json({ validationErrors: error.details });
      }
      // Je récupère l'utilisateur correspondant à l'email
      const user = await prisma.user.findUnique({
        where: { email },
      });
      // Si l'utilisateur n'existe pas, je renvoie une erreur
      if (!user) {
        return res.status(400).json({ error: "Email not found" });
      } else {
        // Sinon, je vérifie que le mot de passe correspond
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ error: "Password is incorrect" });
        } else {
          const token = jwt.sign(
            { id: user.id, role: user.role, email: user.email },
            process.env.JWT_SECRET
          );
          res
            .cookie("user_session", token)
            .status(200)
            .json({ message: "User logged in", token });
        }
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Method to logout a user
  static async logout(req, res) {
    try {
      res
        .clearCookie("user_session")
        .status(200)
        .json({ message: "User logged out" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = AuthController;
