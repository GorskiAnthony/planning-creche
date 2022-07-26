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

  static async getAll(req, res) {
    try {
      const days = await prisma.day.findMany({});
      return res.status(200).json({ days });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = DayController;
