const prisma = require("../services/prisma");
const ChangePassword = require("../services/schema/ChangePassword");
const bcrypt = require("bcryptjs");

class UserController {
  static async getAll(req, res) {
    try {
      const users = await prisma.user.findMany({
        where: {
          NOT: {
            role: "SUPER_ADMIN",
          },
        },
      });
      return res.status(200).json({ users });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async get(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
      });
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async changePassword(req, res) {
    try {
      // Je vérifie que les données envoyées sont valides
      const { old_password, password, repeat_password } = req.body;
      const { error } = ChangePassword.validate(
        { old_password, password, repeat_password },
        { abortEarly: false }
      );
      if (error) {
        return res
          .status(422)
          .json({ error: "Veuillez respecter la saisie du mot de passe" });
      } else {
        // je récupère l'ancien MDP pour vérifier qu'il correspond à celui que l'utilisateur a entré
        const user = await prisma.user.findUnique({
          where: {
            id: req.user.id,
          },
        });
        // je vérifie que l'ancien MDP correspond à celui que l'utilisateur a entré
        const isMatch = await bcrypt.compare(old_password, user.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ error: "L'ancien mot de passe est incorrect" });
        } else {
          const hash = await bcrypt.hash(password, 10);
          await prisma.user.update({
            where: {
              id: req.user.id,
            },
            data: {
              password: hash,
            },
          });
          return res
            .status(200)
            .json({ message: "Le mot de passe est bien changé" });
        }
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = UserController;
