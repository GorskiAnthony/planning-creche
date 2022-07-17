const router = require("express").Router();

const AuthController = require("../controllers/AuthController");
const CalendarController = require("../controllers/CalendarController");

/**
 * @api {post} /auth/login Login user
 * @api {post} /auth/register Register new user
 */
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

/**
 * @api {get} /calendars/:id Get calendar by id
 */
router.get("/calendars/:id", CalendarController.getCalendar);

module.exports = router;
