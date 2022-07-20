const prisma = require("../services/prisma");

class DayController {
  static async create(req, res) {
    try {
      const day = await prisma.day.create({
        data: {
          ...req.body,
        },
      });
      return res.status(200).json({ day });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const day = await prisma.day.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          ...req.body,
        },
      });
      return res.status(200).json({ day });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async get(req, res) {
    try {
      const day = await prisma.day.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      return res.status(200).json({ day });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = DayController;
