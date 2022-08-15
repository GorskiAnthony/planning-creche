const prisma = require("../services/prisma");

class MessageController {
  static async getAll(req, res) {
    try {
      const allMessage = await prisma.message.findMany({
        include: {
          author: true,
        },
      });
      return res.status(200).json({ allMessage });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err });
    }
  }

  static async getAllUrgency(req, res) {
    try {
      const allMessage = await prisma.message.findMany({
        where: {
          urgency: true,
        },
        include: {
          author: true,
        },
      });
      return res.status(200).json({ allMessage });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err });
    }
  }

  static async getAllByUser(req, res) {
    try {
      if (req.user.role === "ADMIN" || req.user.role === "SUPER_ADMIN") {
        const allMessage = await prisma.message.findMany({
          include: {
            author: true,
          },
        });
        return res.status(200).json({ allMessage });
      } else {
        const allMessage = await prisma.message.findMany({
          include: {
            author: true,
          },
        });
        return res.status(200).json({ allMessage });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err });
    }
  }

  static async get(req, res) {
    try {
      const message = await prisma.message.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      return res.status(200).json({ message });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err });
    }
  }

  static async create(req, res) {
    try {
      const { authorId, urgency } = req.body;
      await prisma.message.create({
        data: {
          message: req.body.message,
          author: {
            connect: {
              id: authorId,
            },
          },
          urgency,
          createdAt: new Date(),
        },
      });
      res.status(201).json({ message: "Votre message a été ajouté" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      if (req.user.role === "ADMIN" || req.user.role === "SUPER_ADMIN") {
        const updateMessage = await prisma.message.update({
          where: {
            id: parseInt(req.params.id),
          },
          data: {
            message: req.body.message,
            urgency: req.body.urgency,
          },
        });
        return res.status(200).json({ updateMessage });
      } else {
        const updateMessage = await prisma.message.updateMany({
          where: {
            id: parseInt(req.params.id),
            authorId: req.user.id,
          },
          data: {
            message: req.body.message,
            urgency: req.body.urgency,
          },
        });
        return res.status(200).json({
          message: updateMessage.count === 0 ? "Not authorized" : "Updated",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err });
    }
  }

  static async delete(req, res) {
    try {
      if (req.user.role === "ADMIN" || req.user.role === "SUPER_ADMIN") {
        await prisma.message.delete({
          where: {
            id: parseInt(req.params.id),
          },
        });
        res.status(200).json({ message: "Message deleted" });
      } else {
        const deleteData = await prisma.message.deleteMany({
          where: {
            id: parseInt(req.params.id),
            authorId: req.user.id,
          },
        });
        res.status(200).json({
          message:
            deleteData.count === 0
              ? "Not authorized"
              : "Le message à bien été supprimé",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err });
    }
  }
}

module.exports = MessageController;
