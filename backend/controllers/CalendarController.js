const prisma = require("../services/prisma");

class CalendarController {
  /**
   * @api {post} /calendars Create new calendar
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  static async create(req, res) {
    // Je récupère les données envoyées et je vais les pushs en BDD
    try {
      const event = await prisma.event.create({
        // J'assingne les données envoyées
        data: {
          ...req.body,
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
   * @api {getAll} /calendars Get all calendar
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  static async getAll(req, res) {
    try {
      /**
       * Détail de la requête:
       * - Le paramètre id est le id de l'utilisateur connecté (passé dans les params)
       * Depuis le model event, j'insère la condition suivante
       * La condition est que dans mes users (depuis event), je vais cherche 1 user dont l'id est id
       */

      if (req.user.role === "ADMIN") {
        const events = await prisma.event.findMany();
        return res.status(200).json({ events });
      }
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
   * @api {get} /calendars/:id Get calendar by id
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  static async get(req, res) {
    try {
      if (req.user.role === "ADMIN") {
        const event = await prisma.event.findUnique({
          where: {
            id: parseInt(req.params.id),
          },
        });
        return res.status(200).json({ event });
      }
      const event = await prisma.event.findMany({
        where: {
          AND: [
            {
              id: parseInt(req.params.id),
            },
            {
              users: {
                some: {
                  user: {
                    id: req.user.id,
                  },
                },
              },
            },
          ],
        },
      });
      return res.status(200).json({ event });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err });
    }
  }

  /**
   * @api {post} /calendars/:id Update calendar by id
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  static async update(req, res) {
    try {
      const updateEvent = await prisma.event.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          ...req.body,
        },
      });
      return res.status(200).json({ updateEvent });
    } catch (err) {
      console.log(err);
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
      const deleteEvent = await prisma.event.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      return res.status(200).json({ deleteEvent });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err });
    }
  }
}

module.exports = CalendarController;
