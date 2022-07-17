const prisma = require("../services/prisma");

class CalendarController {
  static async getCalendar(req, res) {
    try {
      /**
       * Détail de la requête:
       * - Le paramètre id est le id de l'utilisateur connecté (passé dans les params)
       * Depuis le model event, j'insère la condition suivante
       * La condition est que dans mes users (depuis event), je vais cherche 1 user dont l'id est id
       */
      const calendar = await prisma.event.findMany({
        where: {
          users: {
            some: {
              user: {
                id: req.params.id,
              },
            },
          },
        },
      });
      res.status(200).json({ calendar });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
}

module.exports = CalendarController;
