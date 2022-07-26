const prisma = require("../services/prisma");

class CalendarController {
  /**
   * @api {post} /calendars Create new calendar
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  static async create(req, res) {
    const { day, timeStart, timeEnd, employeeId } = req.body;
    // Je récupère les données envoyées et je vais les pushs en BDD
    try {
      const event = await prisma.event.create({
        // J'assingne les données envoyées
        data: {
          timeStart,
          timeEnd,
          assigned: req.user.role,
          employee: {
            connect: {
              id: employeeId,
            },
          },
          days: {
            connect: {
              id: day,
            },
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

      if (req.user.role === "ADMIN" || req.user.role === "SUPER_ADMIN") {
        const calendars = await prisma.event.findMany({
          include: {
            employee: true,
            days: true,
          },
        });
        return res.status(200).json({ calendars });
      }
      const calendars = await prisma.event.findMany({
        where: {
          employeeId: req.user.id,
        },
        include: {
          employee: true,
          days: true,
        },
      });

      res.status(200).json({ calendars });
    } catch (err) {
      console.log(err);
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
      if (req.user.role === "ADMIN" || req.user.role === "SUPER_ADMIN") {
        const event = await prisma.event.findUnique({
          where: {
            id: parseInt(req.params.id),
          },
        });
        return res.status(200).json({ event });
      }
      const event = await prisma.event.findMany({
        where: {
          employeeId: req.user.id,
          AND: [
            {
              id: parseInt(req.params.id),
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
    const { day, timeStart, timeEnd, employeeId } = req.body;

    try {
      if (req.user.role === "ADMIN" || req.user.role === "SUPER_ADMIN") {
        const updateEvent = await prisma.event.update({
          where: {
            id: parseInt(req.params.id),
          },
          data: {
            timeStart,
            timeEnd,
            assigned: req.user.role,
            employee: {
              connect: {
                id: employeeId,
              },
            },
            days: {
              connect: {
                id: day,
              },
            },
          },
        });
        return res.status(200).json({ updateEvent });
      }
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
      if (req.user.role === "ADMIN" || req.user.role === "SUPER_ADMIN") {
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
