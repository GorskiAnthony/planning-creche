const router = require("express").Router();
const userMiddleware = require("../middleware/userMiddleware");

const AuthController = require("../controllers/AuthController");
const CalendarController = require("../controllers/CalendarController");

/**
 * @api {post} /auth/login Login user
 * @api {post} /auth/register Register new user
 * @api {delete} /auth/logout Logout current user
 */
router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);
router.delete("/auth/logout", AuthController.logout);

/**
 * @api {post} /calendars Create new calendar
 * @api {get} /calendars Get calendar by id
 * @api {update} /calendars/:id Update calendar
 * @api {delete} /calendars/:id Create new calendar
 */
router.post("/calendars", userMiddleware, CalendarController.create);
router.get("/calendars/:id", userMiddleware, CalendarController.get);
router.get("/calendars", userMiddleware, CalendarController.getAll);
router.put("/calendars/:id", userMiddleware, CalendarController.update);
router.delete("/calendars/:id", userMiddleware, CalendarController.delete);

module.exports = router;
