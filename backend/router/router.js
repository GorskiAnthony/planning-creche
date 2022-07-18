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
 * @api {get} /calendars Get calendar by id
 * @api {post} /calendars Create new calendar
 * @api {delete} /calendars/:id Create new calendar
 */
router.get("/calendars", userMiddleware, CalendarController.getCalendar);
router.post("/calendars", userMiddleware, CalendarController.createEvent);
router.delete("/calendars/:id", userMiddleware, CalendarController.delete);

module.exports = router;
