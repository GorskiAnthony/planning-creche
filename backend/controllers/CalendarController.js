const prisma = require("../services/prisma");

class CalendarController {
  /**
   * @api {get} /calendars Get calendar by id
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
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
                id: req.user.id,
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

  /**
   * @api {post} /calendars Create new calendar
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  static async createEvent(req, res) {
    // Je récupère les données envoyées et je vais les pushs en BDD
    try {
      const event = await prisma.event.create({
        // J'assingne les données envoyées
        data: {
          name: req.body.name,
          description: req.body.description,
          startAt: new Date(req.body.start),
          endAt: new Date(req.body.end),
          // Puis je vais faire le lien avec l'utilisateur connecté
          // Via une relation manyToMany, je vais créer une relation entre event et user
          users: {
            create: [
              {
                assignedBy: req.user.role,
                assignedAt: new Date(),
                user: {
                  connect: {
                    id: req.user.id,
                  },
                },
              },
            ],
          },
        },
      });
      res.status(200).json({ event });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err });
    }
  }

  /**
   * @api {delete} /calendars/:id Delete calendar by id
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  static async delete(req, res) {
    try {
      // Delete relation between event and user
      const deleteRelation = await prisma.EventOnUser.delete({
        where: {
          eventId_userId: {
            eventId: parseInt(req.params.id),
            userId: req.user.id,
          },
        },
      });
      if (deleteRelation) {
        // Delete event
        const deleteEvent = await prisma.event.delete({
          where: {
            id: parseInt(req.params.id),
          },
        });
        return res.status(200).json({ deleteEvent });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err });
    }
  }
}

module.exports = CalendarController;
