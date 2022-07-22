const prisma = require("../services/prisma");

class UserController {
  static async getAll(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json({ users });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async get(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = UserController;
